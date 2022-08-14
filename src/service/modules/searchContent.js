import PQRequest from "../request";

export function getSearchConditions() {
  return PQRequest.get({
    url: "/search/top",
  });
}
export function getSearchHouse() {
  return PQRequest.get({
    url: "/search/result",
  });
}
