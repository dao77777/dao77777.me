import { useState } from "react";
import "./index.scss";
import { remoteApi } from "../../../../../../remoteApi";
import { CommentEdit } from "../CommentEdit";

export function CommentCard(props) {
  // 状态
  const [isShowCommentEdit, setIsShowCommentEdit] = useState(false);
  // 属性
  const { id, nickname, browser, operatingSystem, email, site, timeCreate, content, children } = props;
  // 域外
  const { article_comment_commentCard_insertCommit } = remoteApi();
  // 监听
  async function submit(nickname, email, site, content) {
    await article_comment_commentCard_insertCommit(id, nickname, email, site, content);
  }
  function showCommentEdit() {
    setIsShowCommentEdit(true);
  }
  function hideCommentEdit() {
    setIsShowCommentEdit(false);
  }

  return (
    <div className="CommentCard">
      <div className="self">
        <p>id: {id}</p>
        <p>nickname: {nickname}</p>
        <p>browser: {browser}</p>
        <p>operatingSystem: {operatingSystem}</p>
        <p>email: {email}</p>
        <p>site: {site}</p>
        <p>timeCreate: {timeCreate}</p>
        <p>content: {content}</p>
        <div onClick={showCommentEdit}>回复</div>
        <div onClick={hideCommentEdit}>关闭</div>
        <CommentEdit onSubmit={submit} style={{ display: isShowCommentEdit ? "unset" : "none" }}></CommentEdit>
      </div>
      <div className="children">
        {children}
      </div>
    </div>
  )
}