import http from "./httpService";

const apiEndpoint =
  "http://cruduserlogin-crud-user.apps.na311.openshift.opentlc.com/login";

const tokenKey = "x-auth-token";

export function login(email, password) {
  return http.post(apiEndpoint, { email, password });
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("email");
}
