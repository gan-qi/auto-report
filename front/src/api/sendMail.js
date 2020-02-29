import request from "@/utils/request";

export function sendMail(token) {
  return request({
    url: "/submitreport",
    method: "post",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    params: { token }
  });
}
