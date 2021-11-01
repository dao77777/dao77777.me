import "./index.scss";
import { Content } from "./Content";
import { Comment } from "./Comment";
import { useEffect, useState } from "react";

export function Article() {
  // 状态
  const [isArticleLoaded, setIsArticleLoaded] = useState(false);
  const [isCommentLoaded, setIsCommentLoaded] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [transition, setTransition] = useState("beforeEnter");
  // 域外
  // 监听
  function setIsArticleLoaded_api(val) {
    setIsArticleLoaded(val);
  }
  function setIsCommentLoaded_api(val) {
    setIsCommentLoaded(val);
  }
  function setIsImgLoaded_api(val) {
    setIsImgLoaded(val);
  }
  // 生命周期
  function enter() {
    setTransition("entering");
    setTimeout(() => {
      setTransition("entered");
    }, 1000)
  }

  useEffect(() => {
    const dom = document;
    dom.querySelector(".App").scrollTop = 0;
  }, [])
  useEffect(() => {
    if (isArticleLoaded && isCommentLoaded && isImgLoaded) {
      enter();
    }
  }, [isArticleLoaded, isCommentLoaded, isImgLoaded])
  return (
    <div className="Article">
      <Content transition={transition} onSetIsArticleLoaded={setIsArticleLoaded_api} onSetIsImgLoaded={setIsImgLoaded_api}></Content>
      <Comment transition={transition} onSetIsCommentLoaded={setIsCommentLoaded_api}></Comment>
    </div>
  )
}