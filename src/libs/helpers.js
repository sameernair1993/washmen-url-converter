const isWashmenWebUrl = (url) => {
  const webUrlPattern = /^https:\/\/www.washmen.*/;
  return webUrlPattern.test(url);
}

module.exports = {
  isWashmenWebUrl,
};