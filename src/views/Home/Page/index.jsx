import "./index.scss";

export function Page(props) {
  const { 
    homeRoutePageNum, 
    onForwardClick, 
    onBackClick 
  } = props;

  return (
    <div className="Page">
      <i className="back iconfont icon-left-circle" onClick={onBackClick}></i>
      <span>{ homeRoutePageNum }</span>
      <i className="forward iconfont icon-right-circle" onClick={onForwardClick}></i>
    </div>
  )
}