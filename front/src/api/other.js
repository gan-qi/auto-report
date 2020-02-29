import request from "@/utils/request";

export function getAdvice(token) {
  return request({
    url: "/advice",
    method: "get",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    params: { token }
  });
}

export function postAdvice(token, data) {
  return request({
    url: "/advice",
    method: "post",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    params: { token },
    data: data
  });
}
