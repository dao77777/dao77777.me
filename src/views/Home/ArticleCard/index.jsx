import "./index.scss";
import { TextA } from "../../../dao77777";

export function ArticleCard(props) {
  // 属性
  const {
    title,
    timeCreate,
    clickCount,
    readCount,
    likeCount,
    categoryName,
    tagNames,
    introduce,
    onTitleClick,
    onCategoryClick,
    onTagClick
  } = props;

  return (
    <div className="ArticleCard">
      <TextA onClick={onTitleClick} size={40}>
        {title}
      </TextA>
      <p className="timeCreate">{timeCreate}</p>
      <div className="articleInfo">
        <span>
          <i className="iconfont icon-click2"></i>
          <span>{clickCount}</span>
        </span>
        <span>
          <i className="iconfont icon-ai-eye"></i>
          <span>{readCount}</span>
        </span>
        <span>
          <i className="iconfont icon-xihuan"></i>
          <span>{likeCount}</span>
        </span>
        <span>
          <i className="iconfont icon-leimupinleifenleileibie2"></i>
          <TextA onClick={onCategoryClick} size={12}>
            {categoryName}
          </TextA>
        </span>
        <span>
          <i className="iconfont icon-icontag"></i>
          {tagNames.map((item, index) => (
            <TextA key={index} onClick={() => { onTagClick(index) }} size={12}>
              {item}
            </TextA>
          ))}
        </span>
      </div>
      <p className="introduce">{introduce}</p>
    </div>
  );
};
