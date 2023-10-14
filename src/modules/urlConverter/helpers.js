const extractProductFromWeblink = (values) => {
  const index = values.findIndex((a) => a.includes("-p-"));
  if (index < 0) return null;
  const product = values[index].split("-");
  return { name: product[0], id: product[2] };
};

const isSearchUrl = (pathname) => {
  return pathname.includes("/sr");
};

const isProductPage = (searchParams) => {
  const page = searchParams?.get("Page");
  return page === "Product";
};

const isSearchPage = (searchParams) => {
  return searchParams?.get("Page") === "Search";
};

const extractSearchValue = (searchQuery) => {
  let value = null;
  if (searchQuery?.includes("?q=")) {
    value = searchQuery.split("?q=")[1];
  }
  if (searchQuery?.includes("Query=")) {
    value = searchQuery.split("Query=")[1];
  }
  return value;
};

module.exports = {
  extractProductFromWeblink,
  isSearchUrl,
  isProductPage,
  isSearchPage,
  extractSearchValue,
};