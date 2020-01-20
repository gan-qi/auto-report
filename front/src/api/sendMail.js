import request from "@/utils/request";

export function sendMail(token) {
  return request({
    url: "/submitreport",
    method: "get",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    params: { token }
  });
}
