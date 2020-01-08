import request from "@/utils/request";

export function getConfig() {
  return request({
    url: "/mailconfig",
    method: "get",
    headers: { "content-type": "application/x-www-form-urlencoded" }
  });
}

export function mailConfig(data) {
  return request({
    url: "/mailconfig",
    method: "post",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: data
  });
}
