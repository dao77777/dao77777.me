import "./index.scss";

export function HomeLink(props) {
  const { onClick, icon } = props;

  return (
    <div className="HomeLink" onClick={onClick}>
      <img src={icon} alt="" />
    </div>
  );
};
