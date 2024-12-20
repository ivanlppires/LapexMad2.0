import {useAppStore} from "@/store/app";

const protocolo: string = location.protocol;
const porta: number = 3000;
// const url: string = `${protocolo}//${"123"}:${porta}/api`;
const url: string = "http://209.126.77.36:3001/";

const defaultHeaders: { [key: string]: any } = {
  'Content-Type': 'application/json',
  // 'Authorization': `Bearer ${useAppStore().user.accessToken}`,
}


export function post(route: string, header = {}, payload = {}) {
  return new Promise<{[key:string]: any}>((resolve, reject) => {
    const json = JSON.stringify(payload);
    const headers = new Headers(header);

    for (const key in defaultHeaders) {
      headers.append(key, defaultHeaders[key]);
    }

    const options = {
      method: 'POST',
      headers: headers,
      body: json,
    };

    try {
      fetch(`${url}/${route}`, options)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }

  })
}

export function get(route: string, header = {}, query: string = '') {
  return new Promise<{ [key: string]: any }>((resolve, reject) => {
    const headers = new Headers(header);

    for (const key in defaultHeaders) {
      headers.append(key, defaultHeaders[key]);
    }

    const options = {
      method: 'GET',
      headers: headers,
    };

    let reqUrl = `${url}/${route}`;
    reqUrl += query ? `?${query}` : '';


    try {
      fetch(reqUrl, options)
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    } catch (error) {
      reject(error);
    }
  })
}
