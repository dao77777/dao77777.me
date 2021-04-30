import { useContext } from "react";
import { withRouter } from "react-router";
import { store } from "../../store";
import "./index.scss";

export const HomeLink = withRouter((props) => {
  // 全局
  const { icon } = useContext(store);
  // 域外
  const { push } = props.history;
  // 监听
  function toHome() {
    push("/home");
  }

  return (
    <div className="HomeLink" onClick={toHome}>
      <img src={icon} alt="" />
    </div>
  );
});
