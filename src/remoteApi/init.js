import axios from "axios";

axios.defaults.baseURL = "http://localhost:7001/ui";
axios.defaults.method = "POST";
axios.defaults.headers = {
  "Content-Type": "application/json;charset=utf-8"
};



export async function http(config) {
  return (await axios(config)).data;
};