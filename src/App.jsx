import "./App.scss";
import { createContext, useState, useEffect, useRef } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { HomeLink } from "./views/HomeLink";
import { Article } from "./views/Article";
import { Blog } from "./views/Blog";
import { Archive } from "./views/Archive";
import { Category } from "./views/Category";
import { Home } from "./views/Home";
import { Tag } from "./views/Tag";
import { Other } from "./views/Other";
import { ToTop } from "./views/ToTop";
import { remoteApi } from "./remoteApi";
import _ from "lodash";

export const store = createContext({});

function useStore() {
  // 全局
  const [blog, setBlog] = useState({});
  const [isBlogLoaded, setIsBlogLoaded] = useState(false);
  // Home
  const [homeRoutePageNum, setHomeRoutePageNum] = useState(1);
  const [homeRouteScrollTop, setHomeRouteScrollTop] = useState(0);

  useEffect(() => {
    async function getBlogInfo() {
      const { store_getBlogInfo } = remoteApi();
      const res = await store_getBlogInfo();
      if (res.status === 200) {
        setBlog(res.data);
      }
      setIsBlogLoaded(true);
    }
    getBlogInfo();
  }, []);

  return {
    blog,
    isBlogLoaded,
    homeRoutePageNum,
    setHomeRoutePageNum,
    homeRouteScrollTop,
    setHomeRouteScrollTop
  };
}

function useToTop() {
  const [isShowToTop, setIsShowToTop] = useState(false);
  const toTopElement = useRef(null);

  function onScroll(e) {
    if (e.target.scrollTop > 500) {
      setIsShowToTop(true);
    } else {
      setIsShowToTop(false);
    }
  };

  function onToTopClick() {
    toTopElement.current.scrollTop = 0;
  };

  return {
    isShowToTop,
    toTopElement,
    onScroll,
    onToTopClick
  };
}

function useHomeLink(props) {
  const { push } = props.history;

  function onHomeLinkClick() {
    push("/home");
  };

  return {
    onHomeLinkClick
  };
}

export const App = withRouter((props) => {
  const {
    blog,
    isBlogLoaded,
    homeRoutePageNum,
    setHomeRoutePageNum,
    homeRouteScrollTop,
    setHomeRouteScrollTop
  } = useStore();
  const {     
    isShowToTop,
    toTopElement,
    onScroll,
    onToTopClick
  } = useToTop();
  const {
    onHomeLinkClick
  } = useHomeLink(props);

  return (
    <store.Provider value={{ ...blog, isBlogLoaded, homeRoutePageNum, setHomeRoutePageNum, homeRouteScrollTop, setHomeRouteScrollTop }}>
      <div className="App" ref={toTopElement} onScroll={_.debounce(onScroll, 100)}>
        <div className="background" style={{ backgroundImage: `url(${blog.background})` }}></div>
        <div className="backgroundShadow"></div>
        <div className="HomeLinkWrap">
          <HomeLink icon={blog.icon} onClick={onHomeLinkClick}></HomeLink>
        </div>
        <div className={`ToTopWrap ${isShowToTop ? "show" : ""}`}>
          <ToTop toTop={blog.toTop} onClick={onToTopClick}></ToTop>
        </div>
        <Switch>
          <Route path="/home" component={Home}></Route>
          <Route path="/article" component={Article}></Route>
          <Route path="/blog" component={Blog}></Route>
          <Route path="/archive" component={Archive}></Route>
          <Route path="/category" component={Category}></Route>
          <Route path="/tag" component={Tag}></Route>
          <Route path="/other" component={Other}></Route>
          <Redirect to="/home"></Redirect>
        </Switch>
      </div>
    </store.Provider>
  );
});