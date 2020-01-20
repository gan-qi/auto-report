import request from "@/utils/request";

export function getConfig(token) {
  return request({
    url: "/mailconfig",
    method: "get",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    params: { token }
  });
}

export function mailConfig(data, token) {
  return request({
    url: "/mailconfig",
    method: "post",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: data,
    params: { token }
  });
}
