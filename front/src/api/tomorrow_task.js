import request from "@/utils/request";

export function getTomorrowTask(token) {
  return request({
    url: "/tomorrowtask",
    method: "get",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    params: { token }
  });
}

export function addTomorrowTask(data, token) {
  return request({
    url: "/tomorrowtask",
    method: "post",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: data,
    params: { token }
  });
}

export function deleteTomorrowTask(taskid, token) {
  return request({
    url: `/tomorrowtask/${ taskid }`,
    method: "delete",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    params: { token }
  });
}

export function changeTomorrowTask(taskid, data, token) {
  return request({
    url: `/tomorrowtask/${ taskid }`,
    method: "post",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: data,
    params: { token }
  });
}
