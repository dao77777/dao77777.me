import "./index.scss";
import { remoteApi } from "../../../../remoteApi";
import { withRouter } from "react-router";
import { TextA } from "../../../../dao77777";

export const ArticleCard = withRouter((props) => {
  // 属性
  const { id, title, timeCreate, clickCount, readCount, likeCount, categoryName, tagNames, introduce } = props;
  // 域外
  const { push } = props.history;
  const { home_articleCard_updateClickCount } = remoteApi();
  // 监听
  async function toArticle() {
    await home_articleCard_updateClickCount(id);
    push("/article", { id });
  }
  function toCategory() {
    push("/category", { categoryName });
  }
  function toTag(tagName) {
    return () => {
      push("/tag", { tagName });
    }
  }

  return (
    <div className="ArticleCard">
      <TextA onClick={toArticle} size={40}>{title}</TextA>
      <p className="timeCreate">{timeCreate}</p>
      <div className="articleInfo">
        <span><i className="iconfont icon-click2"></i><span>{clickCount}</span></span>
        <span><i className="iconfont icon-ai-eye"></i><span>{readCount}</span></span>
        <span><i className="iconfont icon-xihuan"></i><span>{likeCount}</span></span>
        <span><i className="iconfont icon-leimupinleifenleileibie2"></i><TextA onClick={toCategory} size={12}>{categoryName}</TextA></span>
        <span>
          <i className="iconfont icon-icontag"></i>
          {tagNames.map(item => <TextA key={item} onClick={toTag(item)} size={12}>{item}</TextA>)}
        </span>
      </div>
      <p className="introduce">{introduce}</p>
    </div>
  )
})