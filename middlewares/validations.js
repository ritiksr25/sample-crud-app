let emailRegex = /^\S+@\S+\.\S+/;

module.exports.blogValidation = (req, res, next) => {
    let { name, email, title, description } = req.body;
    if (req.method === "POST" && (!name || !email || !title || !description)) {
        return res.status(400).json({
            message: "All fields are mandatory.",
            error: true,
            data: req.body
        });
    } else if (req.method === "PUT" && (!title || !description)) {
        return res.status(400).json({
            message: "All fields are mandatory.",
            error: true,
            data: req.body
        });
    } else if (!email || emailRegex.test(email)) {
        return next();
    } else {
        return res
            .status(400)
            .json({ message: "Email not Valid.", error: true, data: req.body });
    }
};
