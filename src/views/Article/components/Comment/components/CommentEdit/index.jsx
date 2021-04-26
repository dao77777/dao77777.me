import { useState } from "react";
import "./index.scss";

export function CommentEdit(props) {
  // 状态
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [site, setSite] = useState("");
  const [content, setContent] = useState("");
  // 域外
  const { onSubmit } = props;
  // 监听
  function updateNickname(e) {
    setNickname(e.target.value);
  }
  function updateEmail(e) {
    setEmail(e.target.value);
  }
  function updateSite(e) {
    setSite(e.target.value);
  }
  function updateContent(e) {
    setContent(e.target.value);
  }
  async function submit() {
    function convert(str) {
      return str === "" ? null : str;
    }
    await onSubmit(convert(nickname), convert(email), convert(site), convert(content));
  }

  return (
    <div className="CommentEdit" {...{ ...props, onSubmit: undefined }}>
      <input type="text" placeholder="nickname" value={nickname} onChange={updateNickname}/>
      <input type="text" placeholder="email" value={email} onChange={updateEmail}/>
      <input type="text" placeholder="site" value={site} onChange={updateSite}/>
      <input type="text" placeholder="content" value={content} onChange={updateContent}/>
      <button onClick={submit}>提交</button>
    </div>
  )
}