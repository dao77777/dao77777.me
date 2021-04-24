import React, { Component } from "react";
import "./index.scss";

/* 
  opened
    boolean
    default: false
    false/true
  color
    string
    default: primary
    primary/success/warning/danger
  size
    string
    default: base
    base/mini/medium/large
*/

export class Open extends Component {
  static defaultProps = {
    opened: false,
    color: "primary",
    size: "base"
  };

  colorArr = ["primary", "success", "warning", "danger"];

  mainClass = () => {
    const {
      props: { opened, color, size },
      colorArr,
    } = this;
    return colorArr.indexOf(color) === -1
      ? ["dao77777-Open", `opened-${opened}`, `size-${size}`].join(" ")
      : ["dao77777-Open", `opened-${opened}`, `color-${color}`, `size-${size}`].join(
          " "
        );
  };

  borderColor = () => {
    const {
      props: { color },
      colorArr,
    } = this;

    return colorArr.indexOf(color) === -1 ? color : undefined;
  };

  topAndBottomTransition = () =>
    !this.props.opened ? "transform 0.12s" : "transform 0.12s 0.12s";

  middleTransition = () =>
    !this.props.opened
      ? "transform 0.12s 0.12s, opacity 0.12s 0.12s"
      : "transform 0.12s, opacity 0.12s";

  render() {
    const { borderColor, topAndBottomTransition, middleTransition } = this;

    return (
      <div className={this.mainClass()}>
        <div
          className="line line1"
          style={{
            borderColor: borderColor(),
            transition: topAndBottomTransition(),
          }}
        ></div>
        <div
          className="line line2"
          style={{
            borderColor: borderColor(),
            transition: middleTransition(),
          }}
        ></div>
        <div
          className="line line3"
          style={{
            borderColor: borderColor(),
            transition: topAndBottomTransition(),
          }}
        ></div>
      </div>
    );
  }
}
