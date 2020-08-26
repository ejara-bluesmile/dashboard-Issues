import http from "../httpService";
// import { apiUrl } from "../config.json";
import Swal from "sweetalert2";

const apiEndpoint =
  "http://sprintsapp-bluesprint.apps.na311.openshift.opentlc.com/api/backlog";

function backlogUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getBacklogs() {
  return http.get(apiEndpoint, {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}

export function getBacklog(backlogId) {
  return http.get(backlogUrl(backlogId), {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}

export function saveBacklog(backlog) {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Saved",
    showConfirmButton: false,
    timer: 1500
  });
  if (backlog.id) {
    const body = { ...backlog };
    delete body.id;
    return http.put(backlogUrl(backlog.id), body, {
      headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
    });
  }

  return http.post(apiEndpoint, backlog, {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}

export function deleteBacklog(backlogId) {
  return http.delete(backlogUrl(backlogId), {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}
