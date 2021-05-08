import axios from 'axios';

const service = axios.create({
  baseURL: "http://localhost:7001/ui",
  method: "POST",
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  },
  timeout: 10000
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error)
    return { status: 500, statusMessage: "服务器错误", data: null };
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data;

    return res;
  },
  error => {
    console.log(error);
    return { status: 500, statusMessage: "服务器错误", data: null };
  }
)

export const request = service;
