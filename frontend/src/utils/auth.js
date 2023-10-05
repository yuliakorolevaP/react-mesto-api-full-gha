function handleResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export const BASE_URL = "https://api.yuliakorolyova.nomoredomainsrocks.ru";


export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export function login(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);
}

export function checkToken(jwt) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${jwt}`,
    },
  }).then(handleResponse);
}