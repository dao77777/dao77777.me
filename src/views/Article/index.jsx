import "./index.scss";
import { Content } from "./components/Content";
import { Comment } from "./components/Comment";

export function Article() {
  return (
    <div className="Article">
      <Content></Content>
      <Comment></Comment>
    </div>
  )
}