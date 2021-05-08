import "./index.scss";

export function Page(props) {
  // 属性
  const { homeRoutePageNum } = props;
  // 域外
  const { onForward, onBack } = props;
  // 监听
  function forward() {
    onForward();
  }
  function back() {
    onBack();
  }

  return (
    <div className="Page">
      <i className="back iconfont icon-left-circle" onClick={back}></i>
      <span>{ homeRoutePageNum }</span>
      <i className="forward iconfont icon-right-circle" onClick={forward}></i>
    </div>
  )
}