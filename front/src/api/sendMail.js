import request from "@/utils/request";

export function sendMail() {
  return request({
    url: "/submitreport",
    method: "get",
    headers: { "content-type": "application/x-www-form-urlencoded" }
  });
}
