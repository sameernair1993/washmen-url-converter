const { URL } = require("url");

const isWashmenWebUrl = (url) => {
  const webUrlPattern = /^https:\/\/www.washmen.*/;
  return webUrlPattern.test(url);
};

const isWashmenDeepLink = (url) => {
  const deepLinkPattern = /^washmen:\/\/\?(\w+=[^&]+&)+\w+=[^&]+$/;
  return deepLinkPattern.test(url);
};

const sanitizeDeeplink = (deeplink) => {
  const htmlPattern = /<[^>]*>/;
  if (htmlPattern.test(deeplink)) {
    return null;
  }

  // Extract the query string
  const queryString = deeplink.match(/\?(.+)/)[1];

  // Split the query string into key-value pairs
  const queryParams = queryString.split('&');
  // Initialize an object to store sanitized parameters
  const sanitizedParams = {};

  for (const param of queryParams) {
    const [key, value] = param.split('=');
    if (key && value) {
      // Sanitize and store the key-value pair
      const sanitizedKey = key.trim();
      let sanitizedValue = value.trim();
      sanitizedParams[sanitizedKey] = sanitizedValue;
    }
  }
  return sanitizedParams;
};

const parseUrl = (url) => new URL(url);

module.exports = {
  isWashmenWebUrl,
  sanitizeDeeplink,
  isWashmenDeepLink,
  parseUrl,
};