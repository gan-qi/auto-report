import request from "@/utils/request";

export function downloadFile(token) {
  return request({
    url: "/outputfile",
    method: "get",
    responseType: "blob",
    params: { token }
  });
}
