import { useEffect, useState } from "react";
import "./index.scss";
import { remoteApi } from "../../../../remoteApi";
import { CommentEdit } from "../CommentEdit";
import { message } from "../../../../dao77777";

export function CommentCard(props) {
  // 状态
  const [isShowCommentEdit, setIsShowCommentEdit] = useState(false);
  const [color, setColor] = useState("rgb(0, 0, 0)");
  // 属性
  const {
    id,
    nickname,
    browser,
    operatingSystem,
    email,
    site,
    timeCreate,
    content,
    children,
    replied,
  } = props;
  // 域外
  const { article_comment_commentCard_insertCommit } = remoteApi();
  const random = Math.random;
  const { onGetComment } = props;
  const { messageSend } =message();
  // 监听
  async function submit(nickname, email, site, content) {
    function convert(str) {
      return str.trim() === "" ? null : str;
    }
    const processedNickname = convert(nickname);
    const processedEmail = convert(email);
    const processedSite = convert(site);
    const processedContent = convert(content);

    // 输入校验
    const verifyContent = processedContent === null ? false : true;
    const verifyEmail = processedEmail ? /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(processedEmail) : true;
    const verifySite = processedSite ? /[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(processedSite) : true;

    if (!verifyContent) {
      messageSend("error", "评论内容不能为空(●'◡'●)");
      return { status: 500, statusMessage: "评论内容不能为空", data: null };
    }
    if (!verifyEmail) {
      messageSend("error", "邮箱格式不正确(●'◡'●)");
      return { status: 500, statusMessage: "邮箱格式不正确", data: null };
    }
    if (!verifySite) {
      messageSend("error", "网址格式不正确(●'◡'●)");
      return { status: 500, statusMessage: "网址格式不正确", data: null };
    }

    const res = await article_comment_commentCard_insertCommit(id, processedNickname, processedEmail, processedSite, processedContent);
    if (res.status === 200) {
      messageSend("success", "评论成功！(●'◡'●)");
      onGetComment();
    }

    return res;
  }
  function showCommentEdit() {
    setIsShowCommentEdit(true);
  }
  function hideCommentEdit() {
    setIsShowCommentEdit(false);
  }
  // 生命周期
  function getColor() {
    const randomR = Math.ceil(random() * 100 + 155);
    const randomG = Math.ceil(random() * 100 + 155);
    const randomB = Math.ceil(random() * 100 + 155);
    setColor(`rgb(${randomR}, ${randomG}, ${randomB})`);
  }

  useEffect(() => {
    getColor();
  }, []);
  return (
    <div className="CommentCard">
      <div className="colorBall" style={{ backgroundColor: color }}></div>
      <div className="right">
        <div className="info">
          <div className="comment">
            <div className="commentInfo">
              <a
                href={site ? site : ""}
                title={`邮箱: ${email}, 网址: ${site}`}
              >
                {nickname}
              </a>
              <span>{browser}</span>
              <span>{operatingSystem}</span>
            </div>
            <div className="timeCreate">{timeCreate}</div>
            <div className="content">
              {replied ? (
                <a
                  href={replied.site ? replied.site : ""}
                  title={`邮箱: ${replied.email}, 网址: ${replied.site}`}
                >{`@${replied.nickname}， `}</a>
              ) : null}
              {content}
            </div>
          </div>
          <div className="reply" onClick={showCommentEdit}>
            回复
          </div>
        </div>
        <CommentEdit
          onSubmit={submit}
          onCancel={hideCommentEdit}
          hasCancelButton
          style={{ display: isShowCommentEdit ? "flex" : "none" }}
        ></CommentEdit>
        {children.length === 0 ? null : (
          <div className="children">{children}</div>
        )}
      </div>
    </div>
  );
}
