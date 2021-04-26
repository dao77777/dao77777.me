import { withRouter } from "react-router";
import "./index.scss";

export const HomeLink = withRouter((props) => {
  // 域外
  const { push } = props.history;
  // 监听
  function toHome() {
    push("/home");
  }

  return (
    <div className="HomeLink" onClick={toHome}>
      <img src="https://dao77777-blog.oss-cn-chengdu.aliyuncs.com/icon/favicon.png" alt="" />
    </div>
  );
});
