import { useContext } from "react";
import "./index.scss";
import { store } from "../../store";

export function ToTop() {
  // 全局
  const { toTop } = useContext(store);
  // 域外
  const app = document.querySelector(".App");
  // 监听
  function toTop_api() {
    app.scrollTop = 0;
  }
  return (
    <div className="ToTop" onClick={toTop_api}>
      <img src={toTop} alt=""/>
    </div>
  )
}