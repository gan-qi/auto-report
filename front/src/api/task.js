import request from "@/utils/request";

export function getTask(token) {
  return request({
    url: "/task",
    method: "get",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    params: { token }
  });
}

export function addTask(data, token) {
  return request({
    url: "/task",
    method: "post",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: data,
    params: { token }
  });
}

export function deleteTask(taskid, token) {
  return request({
    url: `/task/${taskid}`,
    method: "delete",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    params: { token }
  });
}

export function changeTask(taskid, data, token) {
  return request({
    url: `/task/${taskid}`,
    method: "post",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: data,
    params: { token }
  });
}
