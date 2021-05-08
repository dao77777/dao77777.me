import "./index.scss";
import { ArticleCard } from "./ArticleCard";
import { Page } from "./Page";
import { RouterLink } from "./RouterLink";
import { useEffect, useLayoutEffect, useState } from "react";
import { remoteApi } from "../../remoteApi";
import { message } from "../../dao77777";
import { store } from "../../store";
import { useContext } from "react";

export function Home() {
  // 状态
  const [articleCardArr, setArticleCardArr] = useState([]);
  const [isArticleCardArrLoaded, setIsArticleCardArrLoaded] = useState(false);
  const [homeLoading, setHomeLoading] = useState(0);
  // 路由
  const { homeRoutePageNum } = useContext(store);
  // 域外
  const { home_getArticleCardArray } = remoteApi();
  const { messageSend } = message();
  const { isBlogLoaded } = useContext(store);
  const dom = document;
  const { setHomeRoutePageNum } = useContext(store);
  const { homeRouteScrollTop, setHomeRouteScrollTop } = useContext(store);
  // 监听
  async function forward() {
    const res = await getArticleCardArr(homeRoutePageNum + 1);
    if (res.status === 200) {
      setHomeRoutePageNum(homeRoutePageNum + 1);
      dom.querySelector(".App").scrollTop = 0;
    }
  }
  async function back() {
    if (homeRoutePageNum <= 1) {
      messageSend("info", "已经是首页了");
      return;
    }
    const res = await getArticleCardArr(homeRoutePageNum - 1);
    if (res.status === 200) {
      setHomeRoutePageNum(homeRoutePageNum - 1);
      dom.querySelector(".App").scrollTop = 0;
    }
  }
  // 生命周期
  async function getFirstPageArticleCardArr() {
    await getArticleCardArr(homeRoutePageNum);
    setIsArticleCardArrLoaded(true);
  }
  function changeHomeLoading() {
    setHomeLoading(1);
    setTimeout(() => {
      setHomeLoading(2);
    }, 1000);
  }
  function getScrollTop() {
    dom.querySelector(".App").scrollTop = homeRouteScrollTop;
  }
  function markScrollTop() {
    setHomeRouteScrollTop(dom.querySelector(".App").scrollTop);
  }
  // 副作用
  async function getArticleCardArr(homeRoutePageNum) {
    const res = await home_getArticleCardArray(homeRoutePageNum);
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
    return () => {
    };
  }, []);
  useLayoutEffect(() => {
    return () => {
      markScrollTop();
    };
  }, []);
  useEffect(() => {
    if (isArticleCardArrLoaded && isBlogLoaded) {
      changeHomeLoading();
      getScrollTop();
    }
  }, [isArticleCardArrLoaded, isBlogLoaded]);
  const homeLoadingStatus =
    homeLoading === 0 ? "before" : homeLoading === 1 ? "ing" : "after";
  return (
    <div className="Home">
      <main>
        <div className={"card " + homeLoadingStatus}>
          {articleCardArr.map((item) => (
            <ArticleCard key={item.id} {...item}></ArticleCard>
          ))}
        </div>
        <div className={"PageWrap " + homeLoadingStatus}>
          <Page
            onForward={forward}
            onBack={back}
            homeRoutePageNum={homeRoutePageNum}
          ></Page>
        </div>
      </main>
      <div className={"RouterLinkWrap " + homeLoadingStatus}>
        <RouterLink></RouterLink>
      </div>
    </div>
  );
}
