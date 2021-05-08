import "./index.scss";
import { Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";

export function Arknights(props)  {
  const [isRow, setIsRow] = useState(false)

  return (
    <div className="Arknights">
      <div className="phone">
      <Switch>
      </Switch>
      </div>
    </div>
  )
}