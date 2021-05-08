import "./index.scss";
import { BlogLink } from "./BlogLink";
import { withRouter } from "react-router-dom";
import { TextA } from "../../../dao77777";


export const RouterLink = withRouter((props) => {
  // 域外
  const { push } = props.history;
  //监听
  function toArchive(){
    push("/archive");
  }
  function toTag() {
    push("/tag");
  }
  function toCategory() {
    push("/category");
  }
  function toOther() {
    push("/other");
  }

  return (
    <div className="RouterLink">
      <BlogLink></BlogLink>
      <div className="router"><i className="iconfont icon-book-fill"></i><TextA onClick={toArchive}>归档</TextA></div>
      <div className="router"><i className="iconfont icon-icontag"></i><TextA onClick={toTag}>标签</TextA></div>
      <div className="router"><i className="iconfont icon-leimupinleifenleileibie2"></i><TextA onClick={toCategory}>分类</TextA></div>
      <div className="router"><i className="iconfont icon-qita"></i><TextA onClick={toOther}>其他</TextA></div>
    </div>
  )
})