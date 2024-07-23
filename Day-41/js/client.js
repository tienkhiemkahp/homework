import { getTokenStorage, setTokenStorage } from "./storage.js";

export const httpClient = {
  token: null,
  baseUrl: null,
  refreshTokenPromise: null,
  send: async function (path, method = "GET", body = null, headers = {}) {
    let response = null;
    try {
      if (!this.baseUrl) {
        throw new Error("Vui lòng cập nhật baseUrl");
      }
      const url = this.baseUrl + path;
      const initialHeaders = { "Content-Type": "application/json" };
      Object.assign(initialHeaders, headers);
      if (this.token) {
        initialHeaders["Authorization"] = `Bearer ${this.token}`;
      }
      const options = {
        method,
        headers: initialHeaders,
      };
      if (body) {
        options.body = JSON.stringify(body);
      }
      response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();

      return { response, data };
    } catch (e) {
      console.log(e);
    }
  },
  get: function (url) {
    return this.send(url);
  },
  post: function (url, body, headers = {}) {
    return this.send(url, "POST", body, headers);
  },
  put: function (url, body, headers = {}) {
    return this.send(url, "PUT", body, headers);
  },
  patch: function (url, body, headers = {}) {
    return this.send(url, "PATCH", body, headers);
  },
  delete: function (url, headers = {}) {
    return this.send(url, "DELETE", null, headers);
  },
};

