const statusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  INTERNAL_SERVER_ERROR: 500,
};

const errors = {
  INVALID_URL: "URL is not valid",
  UNSECURE_URL: "URL is not secure",
  NOT_WASHMEN_URL: "This URL does not belong to Washmen",
};

module.exports = {
  statusCodes,
  errors,
  SEARCH_PATH: "sr",
  SECURE_PROTOCOL: "https:"
};