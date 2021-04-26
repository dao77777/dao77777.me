import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import "./index.scss";
import { remoteApi } from "../../../../remoteApi";

export const Content = withRouter((props) => {
  // 状态
  const [article, setArticle] = useState({});
  // 路由
  const { id } = props.history.location.state;
  // 域外
  const { article_content_getArticle } = remoteApi();
  // 生命周期
  async function getArticle() {
    const res = await article_content_getArticle(id);
    if (res.status === 200) {
      setArticle(res.data);
    }
  }

  useEffect(() => {
    getArticle();
  }, [])
  return (
    <div className="Content">
      <p>categoryName: {article.categoryName}</p>
      <p>clickCount: {article.clickCount}</p>
      <p>cover: {article.cover}</p>
      <p>id: {article.id}</p>
      <p>introduce: {article.introduce}</p>
      <p>likeCount: {article.likeCount}</p>
      <p>music: {article.music}</p>
      <p>readCount: {article.readCount}</p>
      <p>tagName: {article.tagName}</p>
      <p>timeCreate: {article.timeCreate}</p>
      <p>title: {article.title}</p>
      <p>content: {article.content}</p>
    </div>
  )
})