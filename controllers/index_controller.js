module.exports.index = (req, res) => {
    res.status(200).json({
        message: "Welcome to API!! Use /api/v1/blogs for CRUD Operations.",
        error: false,
        data: null
    });
};
