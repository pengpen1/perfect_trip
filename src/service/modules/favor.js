import PQRequest from "../request";

export function getFavorList() {
  return PQRequest.get({
    url: "/favor/list",
  });
}
export function getHistoryList() {
  return PQRequest.get({
    url: "/favor/history",
  });
}
