import "./index.scss";
import { withRouter } from "react-router-dom";
import { store } from "../../../../store";
import { useContext } from "react";

export const BlogLink = withRouter((props) => {
  // 全局
  const { nickname, signature } = useContext(store);
  // 域外
  const { push } = props.history;
  // 监听
  function toArticle() {
    push("/blog");
  }

  return (
    <div className="BlogLink" onClick={toArticle}>
      <p>{signature}</p>
      <p>{nickname}</p>
    </div>
  )
})