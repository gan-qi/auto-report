import request from "@/utils/request";

export function getTask() {
  return request({
    url: "/task",
    method: "get",
    headers: { "content-type": "application/x-www-form-urlencoded" }
  });
}

export function addTask(data) {
  return request({
    url: "/task",
    method: "post",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: data
  });
}

export function deleteTask(taskid) {
  return request({
    url: `/task/${taskid}`,
    method: "delete",
    headers: { "content-type": "application/x-www-form-urlencoded" }
  });
}

export function changeTask(taskid, data) {
  return request({
    url: `/task/${taskid}`,
    method: "post",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: data
  });
}
