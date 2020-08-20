import http from "./httpService";

const endpointUser =
  "http://cruduserlogin-crud-user.apps.na311.openshift.opentlc.com/api/sign-up";

export function register(user) {
  return http.post(endpointUser, {
    email: user.email,
    password: user.password,
    name: user.name,
    lastname: user.lastname,
    createAt: ""
  });
}
