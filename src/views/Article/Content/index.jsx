import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import "./index.scss";
import { remoteApi } from "../../../remoteApi";
import { TextA } from "../../../dao77777";
import ReactMarkdown from "react-markdown";

export const Content = withRouter((props) => {
  // 状态
  const [article, setArticle] = useState({});
  // 属性
  const { transition } = props;
  // 路由
  const { id } = props.location.state;
  // 域外
  const { article_content_getArticle } = remoteApi();
  const { push } = props.history;
  const { onSetIsArticleLoaded, onSetIsImgLoaded } = props
  // 监听
  function toCategory() {
    push("/category", { categoryName: article.categoryName });
  }
  function toTag(tagName) {
    return () => {
      push("/tag", { tagName });
    };
  }
  function imgLoadingStart() {
    onSetIsImgLoaded(true);
  }
  // 生命周期
  async function getArticle() {
    const res = await article_content_getArticle(id);
    if (res.status === 200) {
      setArticle(res.data);
      onSetIsArticleLoaded(true);
    }
  }

  useEffect(() => {
    getArticle();
  }, []);
  return (
    <div className="Content">
      <h1 className={transition}>{article.title}</h1>
      <div className={"articleInfo " + transition}>
        <div className="infoItem">
          <i className="iconfont icon-shijian"></i>
          <span>{article.timeCreate}</span>
        </div>
        <div className="infoItem">
          <i className="iconfont icon-click2"></i>
          <span>{article.clickCount}</span>
        </div>
        <div className="infoItem">
          <i className="iconfont icon-ai-eye"></i>
          <span>{article.readCount}</span>
        </div>
        <div className="infoItem">
          <i className="iconfont icon-xihuan"></i>
          <span>{article.likeCount}</span>
        </div>
        <div className="infoItem">
          <i className="iconfont icon-leimupinleifenleileibie2"></i>
          <TextA onClick={toCategory}>{article.categoryName}</TextA>
        </div>
        <div className="infoItem">
          <i className="iconfont icon-icontag"></i>
          {article.tagNames
            ? article.tagNames.map((item, index) => (
                <TextA key={index} onClick={toTag(item)}>
                  {item}
                </TextA>
              ))
            : article.tagNames}
        </div>
      </div>
      <img
        className={transition}
        src={article.cover}
        onLoad={imgLoadingStart}
        alt=""
      />
      <ReactMarkdown className={"markdown-body " + transition}>{article.content}</ReactMarkdown>
    </div>
  );
});
