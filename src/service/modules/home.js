import PQRequest from "../request";

export function getHotCitySuggests() {
  return PQRequest.get({
    url: "/home/hotSuggests",
  });
}

export function getCategories() {
  return PQRequest.get({
    url: "/home/categories",
  });
}

export function getHouseList(page) {
  return PQRequest.get({
    url: "/home/houselist",
    params: {
      page,
    },
  });
}
