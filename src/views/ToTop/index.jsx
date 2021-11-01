import "./index.scss";

export function ToTop(props) {
  const { toTop, onClick } = props;
  return (
    <div className="ToTop" onClick={onClick}>
      <img src={toTop} alt=""/>
    </div>
  )
}