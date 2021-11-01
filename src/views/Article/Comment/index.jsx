import "./index.scss";
import { CommentEdit } from "./CommentEdit";
import { CommentCard } from "./CommentCard";
import { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { remoteApi } from "../../../remoteApi";
import { message } from "../../../dao77777";

export const Comment = withRouter((props) => {
  // 状态
  const [comment, setComment] = useState([]);
  // 属性
  const { onSetIsCommentLoaded, transition, location: { state: { id } } } = props;
  // 域外
  const {
    article_comment_getComment,
    article_comment_insertCommit,
  } = remoteApi();
  const { messageSend } = message();
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
    const verifySite = processedSite ? /[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/.test(processedSite) : true;

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

    const res = await article_comment_insertCommit(id, processedNickname, processedEmail, processedSite, processedContent);
    if (res.status === 200) {
      messageSend("success", "评论成功！(●'◡'●)");
      getComment();
    }

    return res;
  }
  async function getComment_api() {
    await getComment();
  }

  async function getComment() {
    const res = await article_comment_getComment(id);
    if (res.status === 200) {
      setComment(res.data);
    }
  }
  // 副作用
  useEffect(() => {
    const { article_comment_getComment } = remoteApi();
    async function getComment_life() {
      await getComment();
      onSetIsCommentLoaded(true);
    }
    async function getComment() {
      const res = await article_comment_getComment(id);
      if (res.status === 200) {
        setComment(res.data);
      }
    }
    getComment_life();
  }, [onSetIsCommentLoaded, id]);
  return (
    <div className={"Comment " + transition}>
      <CommentEdit onSubmit={submit}></CommentEdit>
      {comment.map(item => {
        let replied = null;
        function dfs(tree) {
          const beforeUpdateReplied = replied;
          replied = { ...tree, children: undefined };
          const res = (
            <CommentCard
              key={tree.id}
              {...{ ...tree, children: tree.children.map(dfs) }}
              replied={beforeUpdateReplied}
              onGetComment={getComment_api}
            ></CommentCard>
          );
          replied = beforeUpdateReplied;
          return res;
        }
        return dfs(item);
      })}
    </div>
  );
});
