import http from "../httpService";
import { apiUrl } from "./config.json";

const apiEndpoint = apiUrl + "/issues";
const apiEndpointPut = apiUrl + "/issue";
const apiEndpointPost = apiUrl + "/create";

function putUrl(id) {
  return `${apiEndpointPut}/${id}`;
}

export function getIssues() {
  return http.get(apiEndpoint, {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}

export function getIssue(issueId) {
  return http.get(putUrl(issueId), {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}

export function saveIssues(issue) {
  if (issue.id) {
    const body = { ...issue };
    delete body.id;
    return http.put(putUrl(issue.id), body, {
      headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
    });
  }

  return http.post(apiEndpointPost, issue, {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}

export function deleteIssues(issueId) {
  return http.delete(putUrl(issueId), {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}
