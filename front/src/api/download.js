import request from "@/utils/request";

export function downloadFile(token) {
  return request({
    url: "/outputfile",
    method: "post",
    responseType: "blob",
    params: { token }
  });
}
