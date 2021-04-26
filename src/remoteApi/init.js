import axios from "axios";
import { message } from "../dao77777"

const { messageSend } = message();
axios.defaults.baseURL = "http://localhost:7001/ui";
axios.defaults.method = "POST";
axios.defaults.headers = {
  "Content-Type": "application/json;charset=utf-8"
};



export async function http(config) {
  try {
    const res = (await axios(config)).data;
    if (res.status !== 200) {
      messageSend("error", res.statusMessage);
    };
    return res;
  } catch (error) {
    messageSend("error", error.toString());
    return { status: 500, statusMessage: "服务器错误", data: null };
  }
};