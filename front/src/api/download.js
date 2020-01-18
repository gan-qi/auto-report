import request from "@/utils/request";

export function downloadFile() {
  return request({
    url: "/outputfile",
    method: "get",
    responseType: "blob"
  });
}
