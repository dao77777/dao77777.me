import { useState } from "react";
import "./index.scss";

export function CommentEdit(props) {
  // 状态
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [content, setContent] = useState("");
  const [focus, setFocus] = useState(null);
  // 属性
  const { style } = props;
  let { hasCancelButton } = props;
  hasCancelButton || (hasCancelButton = false);
  // 域外
  const { onSubmit } = props;
  const { onCancel } = props;
  // 监听
  function updateInput(type) {
    return (e) => {
      switch (type) {
        case "nickname":
          setNickname(e.target.value);
          return;
        case "email":
          setEmail(e.target.value);
          return;
        case "site":
          setSite(e.target.value);
          return;
        case "content":
          setContent(e.target.value);
          return;
        default:
          return;
      }
    };
  }
  async function submit() {
    const res = await onSubmit(
      nickname,
      email,
      site,
      content
    );
    if (res.status === 200) {
      setContent("");
    }
  }
  function changeFocus(type) {
    return () => {
      setFocus(type);
    };
  }
  function cancel() {
    onCancel();
  }

  return (
    <div className="CommentEdit" style={style}>
      {hasCancelButton ? (
        <i className="iconfont icon-quxiao" onClick={cancel}></i>
      ) : null}
      <div className="commentInfo">
        <input
          className={focus === "nickname" ? "focus" : ""}
          type="text"
          placeholder="昵称(选填)"
          value={nickname}
          onChange={updateInput("nickname")}
          onFocus={changeFocus("nickname")}
          onBlur={changeFocus(null)}
        />
        <input
          className={focus === "email" ? "focus" : ""}
          type="text"
          placeholder="邮箱(选填)"
          value={email}
          onChange={updateInput("email")}
          onFocus={changeFocus("email")}
          onBlur={changeFocus(null)}
        />
        <input
          className={focus === "site" ? "focus" : ""}
          type="text"
          placeholder="网址(选填)"
          value={site}
          onChange={updateInput("site")}
          onFocus={changeFocus("site")}
          onBlur={changeFocus(null)}
        />
      </div>
      <textarea
        placeholder="评论内容"
        value={content}
        onChange={updateInput("content")}
      />
      <button onClick={submit}>提交</button>
    </div>
  );
}
