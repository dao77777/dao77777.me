import { useEffect, useState } from "react";
import "./index.scss";
import { withRouter } from "react-router-dom";
import { remoteApi } from "../../../../../../remoteApi";

export const BlogLink = withRouter((props) => {
  // 状态
  const [nickname, setNickname] = useState("");
  const [signature, setSignature] = useState("");
  // 域外
  const { push } = props.history;
  const { home_routerLink_blogLink_getAuthorInfo } = remoteApi();
  // 监听
  function toArticle() {
    push("/blog");
  }
  // 生命周期
  async function getAuthor() {
    const res = await home_routerLink_blogLink_getAuthorInfo();
    if (res.status === 200) {
      setNickname(res.data.nickname);
      setSignature(res.data.signature);
    }
  }

  useEffect(() => {
    getAuthor();
  }, [])
  return (
    <div className="BlogLink" onClick={toArticle}>
      <p>{signature}</p>
      <p>{nickname}</p>
    </div>
  )
})