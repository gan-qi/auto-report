import request from "@/utils/request";

export function downloadFile() {
  return request({
    url: "/outputfile",
    method: "get",
    headers: { "content-type": "application/x-www-form-urlencoded" }
  });
}
