const logger = require("../../logger/Logger");
const {
  extractProductFromWeblink,
  isSearchUrl,
  isSearchPage,
  extractSearchValue,
} = require("./helpers");
const converterRepository = require("./converter.repository");
const productService = require("../product/product.service");
const config = require("../../config");
const { SEARCH_PATH, statusCodes } = require("../../libs/constants");
const { parseUrl } = require("../../libs/helpers");
const { ErrorResponse } = require("../../entities/response");

class ConverterService {
  static getInstance() {
    if (!ConverterService.instance) {
      ConverterService.instance = new ConverterService();
    }
    return ConverterService.instance;
  }

  /**
   * @param {*} url 
   * @returns the appropriate deeplink
   */
  async createDeeplink(url) {
    const savedUrl = await converterRepository.getUrl({ weblink: url });
    if (savedUrl?.deeplink) return savedUrl.deeplink;
    let deeplink = null;
    const parsedUrl = parseUrl(url);
    const { pathname, searchParams, search } = parsedUrl;
    const splitPath = pathname.split("/");
    const product = extractProductFromWeblink(splitPath);
    if (product) {
      await this.doesProductExist(product.id);
      product.subPath = splitPath[1];
      deeplink = this.formDeeplink("Product", product.id, searchParams);
      await converterRepository.saveUrl({ weblink: url, deeplink });
    }
    if (isSearchUrl(pathname)) {
      deeplink = this.formDeeplink("Search&Query", null, searchParams, search);
      await converterRepository.saveUrl({ weblink: url, deeplink });
    }
    if (!product || !isSearchUrl(pathname)) {
      deeplink = this.formDeeplink("Home", null, null);
    }
    logger.log("info", { message: "deeplink formed", data: deeplink });
    return deeplink;
  }

  /**
   * @param {*} id 
   * @returns the product if it exists, else throws an error
   */
  async doesProductExist(id) {
    const product = await productService.getProduct(id);
    if (!product) {
      throw new ErrorResponse({ error: "Could not find product. Please verify the contentId" }, statusCodes.NOT_FOUND);
    }
    return product;
  }

  /**
   * @param {*} url 
   * @returns the appropriate web url
   */
  async createWeblink(url) {
    const savedUrl = await converterRepository.getUrl({ deeplink: url });
    if (savedUrl?.weblink) return savedUrl.weblink;
    let weblink = null;
    const parsedUrl = parseUrl(url);
    const { searchParams } = parsedUrl;

    const contentId = searchParams.get("ContentId");
    if (contentId) {
      const product = await this.doesProductExist(contentId);
      weblink = this.formWeblink(product.subPath, `${product.name}-p-${product.productId}`, searchParams);
      await converterRepository.saveUrl({ weblink, deeplink: url });
    }
    if (isSearchPage(searchParams)) {
      weblink = this.formWeblink(SEARCH_PATH, null, searchParams);
      await converterRepository.saveUrl({ weblink, deeplink: url });
    }
    if (!contentId || !isSearchPage) {
      return config.baseWebUrl;
    }
    logger.log("info", { message: "weblink formed", data: weblink });
    return weblink;
  }

  formDeeplink(page, contentId, searchParams, search = null) {
    let deeplink = `${config.baseDeepLink}?Page=${page}`;
    const cityId = searchParams?.get("cityId");
    const clusterId = searchParams?.get("clusterId");
  
    if (contentId) {
      deeplink = `${deeplink}&ContentId=${contentId}`;
    }
    if (search) {
      const value = extractSearchValue(search);
      deeplink = `${deeplink}=${value}`;
    }
    if (cityId) {
      deeplink = `${deeplink}&CityId=${cityId}`;
    }
    if (clusterId) {
      deeplink = `${deeplink}&ClusterId=${clusterId}`;
    }
    return deeplink;
  }

  formWeblink(subPath, product, searchParams, search) {
    let weblink = `${config.baseWebUrl}/${subPath}`;
    const cityId = searchParams?.get("CityId");
    const clusterId = searchParams?.get("ClusterId");
  
    if (subPath === SEARCH_PATH && search) {
      const value = extractSearchValue(search);
      weblink = `${weblink}?q=${value}`;
    }
    if (product) {
      weblink = `${weblink}/${product}`;
    }
    if (cityId) {
      weblink = `${weblink}&cityId=${cityId}`;
    }
    if (clusterId) {
      weblink = `${weblink}&clusterId=${clusterId}`;
    }
    return weblink;
  }
}

module.exports = ConverterService.getInstance();