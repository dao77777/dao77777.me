import "./index.scss";
import { MainLink } from "./MainLink";
import { TextA } from "../../../dao77777";


export function Link(props) {
  const {
    nickname,
    signature,
    onMainLinkClick,
    links
  } = props;

  return (
    <div className="Link">
      <MainLink
        nickname={nickname}
        signature={signature}
        onClick={onMainLinkClick}
      ></MainLink>
      {
        links.map(item => (
          <div key={item.name} className="link"><i className={item.iconClass}></i><TextA onClick={item.onClick}>{item.name}</TextA></div>
        ))
      }
    </div>
  )
}