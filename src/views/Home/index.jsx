import "./index.scss";
import { ArticleCard } from "./ArticleCard";
import { Page } from "./Page";
import { Link } from "./Link";
import { useEffect, useState } from "react";
import { remoteApi } from "../../remoteApi";
import { message } from "../../dao77777";
import { store } from "../../App";
import { useContext } from "react";
import { withRouter } from "react-router";

function useLink(props) {
  const { nickname, signature } = useContext(store);
  const { history: { push } } = props;
  const links = [
    {
      iconClass: "iconfont icon-book-fill",
      onClick: onArchiveLinkClick,
      name: "归档"
    },
    {
      iconClass: "iconfont icon-icontag",
      onClick: onTagLinkClick,
      name: "标签"
    },
    {
      iconClass: "iconfont icon-leimupinleifenleileibie2",
      onClick: onCategoryLinkClick,
      name: "分类"
    },
    {
      iconClass: "iconfont icon-qita",
      onClick: onOtherLinkClick,
      name: "其他"
    }
  ];

  function onMainLinkClick() {
    push("/blog");
  }
  function onArchiveLinkClick() {
    push("/archive");
  }
  function onTagLinkClick() {
    push("/tag");
  }
  function onCategoryLinkClick() {
    push("/category");
  }
  function onOtherLinkClick() {
    push("/other");
  }

  return {
    nickname,
    signature,
    links,
    onMainLinkClick
  }
}

function usePage() {
  const { 
    homeRoutePageNum,
    setHomeRoutePageNum, 
    homeRouteScrollTop, 
    setHomeRouteScrollTop
  } = useContext(store);

  async function onForwardClick() {
    const res = await getArticleCardArr(homeRoutePageNum + 1);
    if (res.status === 200) {
      setHomeRoutePageNum(homeRoutePageNum + 1);
      dom.querySelector(".App").scrollTop = 0;
    }
  }

  async function onBackClick() {
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

  return {
    homeRoutePageNum,
    onForwardClick,
    onBackClick,
    getArticleCardArr
  }
}

export const Home = withRouter((props) => {
  // 状态
  const [articleCardArr, setArticleCardArr] = useState([]);
  const [isArticleCardArrLoaded, setIsArticleCardArrLoaded] = useState(false);
  const [homeLoading, setHomeLoading] = useState(0);
  const {
    nickname,
    signature,
    onMainLinkClick,
    links
  } = useLink(props);
  const {
    homeRoutePageNum,
    onForwardClick,
    onBackClick,
    getArticleCardArr
  } = usePage();

  const { home_getArticleCardArray } = remoteApi();
  const { messageSend } = message();
  const { isBlogLoaded } = useContext(store);
  const dom = document;

  // 监听

  // 生命周期
  function changeHomeLoading() {
    setHomeLoading(1);
    setTimeout(() => {
      setHomeLoading(2);
    }, 1000);
  }
  function getScrollTop() {
    dom.querySelector(".App").scrollTop = homeRouteScrollTop;
  }
  // 副作用

  useEffect(() => {
    async function getFirstPageArticleCardArr() {
      await getArticleCardArr(homeRoutePageNum);
      setIsArticleCardArrLoaded(true);
    }
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
    getFirstPageArticleCardArr();
    return () => {
      function markScrollTop() {
        setHomeRouteScrollTop(dom.querySelector(".App").scrollTop);
      }
      markScrollTop();
    };
  }, []);

  useEffect(() => {
    if (isArticleCardArrLoaded && isBlogLoaded) {
      changeHomeLoading();
      getScrollTop();
    }
  }, [isArticleCardArrLoaded, isBlogLoaded]);

  const homeLoadingStatus = homeLoading === 0 ? "before" : homeLoading === 1 ? "ing" : "after";


  // 域外
  const { push } = props.history;
  const { home_articleCard_updateClickCount } = remoteApi();
  // 监听
  async function onTitleClick(id) {
    home_articleCard_updateClickCount(id);
    push("/article", { id });
  }
  function onCategoryClick(categoryName) {
    push("/category", { categoryName });
  }
  function onTagClick(tagNames, index) {
    push("/tag", { tagName: tagNames[index] });
  }

  return (
    <div className="Home">
      <main>
        <div className={"card " + homeLoadingStatus}>
          {articleCardArr.map((item) => (
            <ArticleCard
              key={item.id}
              title={item.title}
              timeCreate={item.timeCreate}
              clickCount={item.clickCount}
              readCount={item.readCount}
              likeCount={item.likeCount}
              categoryName={item.categoryName}
              tagNames={item.tagNames}
              introduce={item.introduce}
              onTitleClick={() => { onTitleClick(item.id) }}
              onCategoryClick={() => { onCategoryClick(item.categoryName) }}
              onTagClick={(index) => { onTagClick(item.tagNames, index) }}
            ></ArticleCard>
          ))}
        </div>
        <div className={"PageWrap " + homeLoadingStatus}>
          <Page
            onForwardClick={onForwardClick}
            onBackClick={onBackClick}
            homeRoutePageNum={homeRoutePageNum}
          ></Page>
        </div>
      </main>
      <div className={"RouterLinkWrap " + homeLoadingStatus}>
        <Link
          nickname={nickname}
          signature={signature}
          onMainLinkClick={onMainLinkClick}
          links={links}
        ></Link>
      </div>
    </div>
  );
});