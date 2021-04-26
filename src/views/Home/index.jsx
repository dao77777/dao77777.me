import "./index.scss";
import { ArticleCard } from "./components/ArticleCard";
import { Page } from "./components/Page";
import { RouterLink } from "./components/RouterLink";
import { useEffect, useState } from "react";
import { remoteApi } from "../../remoteApi";
import { message } from "../../dao77777";

export function Home() {
  // 状态
  const [articleCardArr, setArticleCardArr] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  // 域外
  const { home_getArticleCardArray } = remoteApi();
  const { messageSend } = message();
  // 监听
  async function forward() {
    const res = await getArticleCardArr(pageNum + 1);
    if (res.status === 200) {
      setPageNum(pageNum + 1);
    }
  }
  async function back() {
    if (pageNum <= 1) {
      messageSend("info", "已经是首页了");
      return;
    }
    const res = await getArticleCardArr(pageNum - 1);
    if (res.status === 200) {
      setPageNum(pageNum - 1);
    }
  }
  // 生命周期
  async function getFirstPageArticleCardArr() {
    await getArticleCardArr(pageNum);
  }
  // 副作用
  async function getArticleCardArr(pageNum) {
    const res = await home_getArticleCardArray(pageNum);
    if (res.status === 200) {
      if (res.data.length === 0) {
        messageSend("info", "已经是尾页了");
        return { status: 500, statusMessage: "已经是尾页了", data: null };
      }
      setArticleCardArr(res.data);
      return { status: 200, statusMessage: "请求成功", data: null };
    }

    return { status: 500, statusMessage: "请求失败", data: null };
  }

  useEffect(() => {
    getFirstPageArticleCardArr();
  }, []);
  return (
    <div className="Home">
      <main>
        <div className="card">
          {articleCardArr.map((item) => (
            <ArticleCard key={item.id} {...item}></ArticleCard>
          ))}
        </div>
        <Page onForward={forward} onBack={back} pageNum={pageNum}></Page>
      </main>
      <RouterLink></RouterLink>
    </div>
  );
}
