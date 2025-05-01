const errorMiddleWare = (err, req, res, next) => {
  try {
    console.log(err);
    const error = JSON.parse(err.message);
    const errorCode = { ...err }.statusCode;

    res.status(errorCode || 500).json({
      success: false,
      message: error || "Server error",
    });
  } catch (e) {
    console.log(e);
  }
};

export default errorMiddleWare;
