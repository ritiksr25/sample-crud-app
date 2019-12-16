escapeRegex = text => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports.viewBlogs = async (req, res) => {
    let { search, perPage, pageNo, sortBy, sortType, id } = req.query;
    let blogs;
    if (id) {
        // specific blog by ObjectID
        blogs = await Blog.findById(id);
        return res
            .status(200)
            .json({ message: "success", error: false, data: blogs });
    } else {
        // filter and sort
        perPage = perPage || 10;
        pageNo = pageNo || 1;
        sortBy = sortBy || "createdAt";
        sortType = sortType || "desc";
        let filter = {};
        if (search) {
            const regex = new RegExp(escapeRegex(search), "gi");
            filter.$or = [
                { name: regex },
                { email: regex },
                { title: regex },
                { description: regex }
            ];
        }
        blogs = await Blog.find(filter)
            .sort({ "[sortBy]": sortType })
            .limit(perPage * pageNo)
            .skip(perPage * pageNo - perPage);
        let totalBlogsSearched = await Blog.countDocuments(filter);
        let totalPagesRequired = Math.floor(
            Number(totalBlogsSearched / perPage) + 1
        );
        let data = {
            blogs,
            totalBlogsSearched,
            totalPagesRequired
        };
        res.status(200).json({ message: "success", error: false, data });
    }
};

module.exports.addBlog = async (req, res) => {
    let { name, email, title, description } = req.body;
    let blog = await Blog.findOne({
        $and: [{ email }, { title: { $regex: `^${title}$`, $options: "i" } }]
    });
    if (blog) {
        res.status(400).json({
            message: "Blog Already Exists.",
            error: true,
            data: req.body
        });
    } else {
        blog = await Blog.create(req.body);
        res.status(200).json({
            message: "Blog Added Successfully",
            error: false,
            data: blog
        });
    }
};

module.exports.updateBlog = async (req, res) => {
    let { id } = req.params;
    let { title, description } = req.body;
    let blog = await Blog.findById(id);
    if (blog) {
        blog.title = title;
        blog.description = description;
        blog = await blog.save();
        res.status(200).json({
            message: "Blog Updated Successfully",
            error: false,
            data: blog
        });
    } else {
        res.status(400).json({
            message: "Blog not Found",
            error: true,
            data: null
        });
    }
};

module.exports.deleteBlog = async (req, res) => {
    let { id } = req.params;
    let blog = await Blog.findById(id);
    if (blog) {
        await blog.delete();
        res.status(200).json({
            message: "Blog Deleted Successfully",
            error: false,
            data: null
        });
    } else {
        res.status(400).json({
            message: "Blog not Found",
            error: true,
            data: null
        });
    }
};
