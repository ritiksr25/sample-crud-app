module.exports.catchErrors = middlewareFunction => {
    return (req, res, next) => {
        middlewareFunction(req, res, next).catch(err => {
            next(err);
        });
    };
};

// not found routes
module.exports.notFound = (req, res) => {
    res.status(404).json({
        message: "Route not Found!!",
        error: true,
        data: null
    });
};

module.exports.sendErrors = (err, req, res, next) => {
    const errorDetails = {
        message: err.message,
        status: err.status || 500,
        error: true
    };
    //logging error for backend console
    console.log(errorDetails);
    console.log(err.stack);
    //sending error to frontend
    res.status(err.status || 500).json(errorDetails);
};
