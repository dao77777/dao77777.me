import "./index.scss";
import { Switch, Route, Redirect } from "react-router-dom";
import { Arknights } from "./Arknights";
import { Home } from "./Home";

export function Other(props) {

  return (
    <div className="Other">
      <Switch>
        <Route path="/other/home" component={Home}></Route>
        <Route path="/other/arknights" component={Arknights}></Route>
        <Redirect to="/other/home"></Redirect>
      </Switch>
    </div>
  )
}