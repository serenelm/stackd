function errorHandler(err, req, res, _next) {
    // In a hackathon demo, keep the error shape simple and friendly.
    // Avoid leaking stack traces to the client.
    const status = err.status || 500;
  
    res.status(status).json({
      message:
        status === 500
          ? "something went wrong on the stackd api."
          : err.message || "request could not be completed."
    });
  }
  
  module.exports = errorHandler;