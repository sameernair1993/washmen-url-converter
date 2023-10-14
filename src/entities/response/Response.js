class Response {
  static send(res, data) {
    res.status(data.metadata.code).json(data);
  }
};

module.exports = Response;