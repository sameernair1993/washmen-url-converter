const isWashmenWebUrl = (url) => {
  const webUrlPattern = /^https:\/\/www.washmen.*/;
  return webUrlPattern.test(url);
};

const sanitizeDeeplink = (deeplink) => {
  const deepLinkPattern = /^washmen:\/\/\?(\w+=[^&]+&)+\w+=[^&]+$/;
  const htmlPattern = /<[^>]*>/;
  if (!deepLinkPattern.test(deeplink)) {
    return null; // Not a valid deep link
  }
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

module.exports = {
  isWashmenWebUrl,
  sanitizeDeeplink,
};