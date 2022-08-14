import PQRequest from "../request";

export function getOrderList(type) {
  return PQRequest.get({
    url: `/order/list?type=${type}`,
  });
}
// type=pend 未完成订单
// type=recent 最近订单
// type=all 全部订单
