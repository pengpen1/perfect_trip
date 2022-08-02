import PQRequset from "../request";

export function getCityAll() {
  return PQRequset.get({
    url: "/city/all",
  });
}
