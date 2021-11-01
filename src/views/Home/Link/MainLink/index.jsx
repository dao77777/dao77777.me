import "./index.scss";

export function MainLink(props) {
  // 全局
  const {
    nickname,
    signature,
    onClick
  } = props;

  return (
    <div className="MainLink" onClick={onClick}>
      <p>{signature}</p>
      <p>{nickname}</p>
    </div>
  )
}