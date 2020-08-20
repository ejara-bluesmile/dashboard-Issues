import http from "../httpService";
// import { apiUrl } from "../config.json";
import Swal from "sweetalert2";

const apiEndpoint =
  "http://cruduserlogin-crud-user.apps.na311.openshift.opentlc.com/api/user";

function userUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getUsers() {
  return http.get(apiEndpoint, {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}

export function getUser(userId) {
  return http.get(userUrl(userId), {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}

export function saveUser(user) {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Saved",
    showConfirmButton: false,
    timer: 1500
  });
  if (user.id) {
    const body = { ...user };
    delete body.id;
    return http.put(userUrl(user.id), body, {
      headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
    });
  }

  return http.post(apiEndpoint, user, {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}

export function deleteUser(userId) {
  return http.delete(userUrl(userId), {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}
