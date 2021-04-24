import React, { Component } from "react";
import loadingUrl from "./assets/loading.svg";
import "./index.scss";

/* 
  size
    string
    default: base
    base/mini/small/large
  display: 是否有遮罩
    boolean
    default: true
    true/false
  children
*/

export class Loading extends Component {
  static defaultProps = {
    size: "base",
    display: true,
    shadow: true,
  };

  divClass = () =>
    [
      "dao77777-Loading",
      `size-${this.props.size}`,
      `display-${this.props.display}`,
      `shadow-${this.props.shadow}`,
    ].join(" ");

  render() {
    return (
      <div className={this.divClass()} style={this.props.style}>
        <img className="image" src={loadingUrl} alt="svg" />
        {this.props.children}
      </div>
    );
  }
}
