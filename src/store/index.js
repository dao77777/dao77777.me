import { createContext, useEffect, useState } from "react";
import { remoteApi } from "../remoteApi";

export const store = createContext({});

export function Store(props) {
  // 状态
  const [blog, setBlog] = useState({});
  const [isBlogLoaded, setIsBlogLoaded] = useState(false);
  // 域外
  const { store_getBlogInfo } = remoteApi();
  // 生命周期
  async function getBlogInfo() {
    const res = await store_getBlogInfo();
    if (res.status === 200) {
      setBlog(res.data);
    }
    setIsBlogLoaded(true);
  }

  useEffect(() => {
    getBlogInfo();
  }, [])
  return <store.Provider value={{ ...blog, isBlogLoaded }}>{props.children}</store.Provider>
}