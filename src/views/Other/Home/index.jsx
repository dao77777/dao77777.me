import { withRouter } from "react-router";
import { TextA } from "../../../dao77777";
import "./index.scss";

export const Home = withRouter((props) => {
  const { push } = props.history;

  function navTo(path) {
    return () => {
      push(path);
    }
  }
  return (
    <div className="Other-Home">
      <TextA onClick={navTo("/other/arknights")}>明日方舟</TextA>
    </div>
  );
})
