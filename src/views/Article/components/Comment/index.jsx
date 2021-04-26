import "./index.scss";
import { CommentEdit } from "./components/CommentEdit";
import { CommentCard } from "./components/CommentCard";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { remoteApi } from "../../../../remoteApi";

export const Comment = withRouter((props) => {
  // 状态
  const [comment, setComment] = useState([]);
  // 路由
  const { id } = props.location.state;
  // 域外
  const {
    article_comment_getComment,
    article_comment_insertCommit,
  } = remoteApi();
  // 监听
  async function submit(nickname, email, site, content) {
    await article_comment_insertCommit(id, nickname, email, site, content);
  }
  // 生命周期
  async function getComment() {
    const res = await article_comment_getComment(id);
    if (res.status === 200) {
      setComment(res.data);
    }
  }

  useEffect(() => {
    getComment();
  }, []);
  return (
    <div className="Comment">
      <CommentEdit onSubmit={submit}></CommentEdit>
      {comment.map(function dfs(tree) {
        return (
          <CommentCard
            key={tree.id}
            {...{ ...tree, children: tree.children.map(dfs) }}
          ></CommentCard>
        );
      })}
    </div>
  );
});
