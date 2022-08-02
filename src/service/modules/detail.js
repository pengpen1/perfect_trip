import PQRequest from "../request";

export function getDetailData(houseId) {
  return PQRequest.get({
    url: `/detail/infos?houseId=${houseId}`,
  });
}
