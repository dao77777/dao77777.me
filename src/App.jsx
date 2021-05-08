import "./App.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { HomeLink } from "./views/HomeLink";
import { Article } from "./views/Article";
import { Blog } from "./views/Blog";
import { Archive } from "./views/Archive";
import { Category } from "./views/Category";
import { Home } from "./views/Home";
import { Tag } from "./views/Tag";
import { Other } from "./views/Other";
import { useContext, useState } from "react";
import { store } from "./store";
import { ToTop } from "./views/ToTop";

function App() {
  // 状态
  const [isShowToTop, setIsShowToTop] = useState(false);
  // 全局
  const { background } = useContext(store);
  // 监听
  function showToTop(e) {
    if (e.target.scrollTop > 500) {
      setIsShowToTop(true);
    }else {
      setIsShowToTop(false);
    }
  }
  // 函数
  function debounce(func, wait) {
    let timeout = null;
    return function () {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => {
        func(...arguments);
        timeout = null;
      }, wait);
    }
  }

  return (
    <div className="App" onScroll={debounce(showToTop, 100)}>
      <div className="background" style={{ backgroundImage: `url(${background})` }}></div>
      <div className="backgroundShadow"></div>
      <div className="HomeLinkWrap">
        <HomeLink></HomeLink>
      </div>
      <div className={`ToTopWrap ${isShowToTop ? "show" : ""}`}>
        <ToTop></ToTop>
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
  );
}

export default App;
