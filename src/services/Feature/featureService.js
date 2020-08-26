import http from "../httpService";
// import { apiUrl } from "../config.json";
import Swal from "sweetalert2";

const apiEndpoint =
  "http://sprintsapp-bluesprint.apps.na311.openshift.opentlc.com/api/feature";

function featureUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getFeatures() {
  return http.get(`${apiEndpoint}s`, {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}

export function getFeature(featureId) {
  return http.get(featureUrl(featureId), {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}

export function saveFeature(feature) {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Saved",
    showConfirmButton: false,
    timer: 1500
  });
  if (feature.id) {
    const body = { ...feature };
    delete body.id;
    return http.put(featureUrl(feature.id), body, {
      headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
    });
  }

  return http.post(apiEndpoint, feature, {
    headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
  });
}

export function deleteFeature(featureId) {
         return http.delete(featureUrl(featureId), {
           headers: { "x-auth-token": localStorage.getItem("x-auth-token") }
         });
       }
