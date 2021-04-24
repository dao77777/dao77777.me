import React, { Component } from "react";
import { Loading } from "../Loading";
import "./index.scss";

/* 
  type
    string
    default: boring
    boring/wow
  color
    string
    default: primary
    primary/success/warning/danger
  size
    string
    default: base
    base/mini/small/large
  border: 圆角
    string
    default: base
    base/round/circle
  disabled: 是否禁止点击
    boolean
    default: false
    false/true
  loading: 是否处于加载
    boolean
    default: false
    false/true
*/
export class Button extends Component {
  static defaultProps = {
    type: "boring",
    color: "primary",
    size: "base",
    border: "base",
    disabled: false,
    loading: false,
  };

  state = {
    text: "ing",
  };

  buttonClass = () => {
    const { type, color, border, size, disabled, loading } = this.props;
    const classArr = ["dao77777-Button"];

    classArr.push(
      `type-${type}`,
      `color-${color}`,
      `size-${size}`,
      `border-${border}`,
      `disabled-${loading ? true : disabled}`,
      `loading-${loading}`
    );
    return classArr.join(" ");
  };

  componentDidMount() {
    const textArr = ["ing", "ing.", "ing..", "ing..."];
    let count = 0;
    this.interval = setInterval(() => {
      this.setState({
        text: textArr[count],
      });
      count = (count + 1) % 4;
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { props, buttonClass } = this;

    return (
      <button
        className={buttonClass()}
        onClick={
          props.loading ? () => {} : props.disabled ? () => {} : props.onClick
        }
        style={props.style}
      >
        {props.children}
        <Loading display={props.loading} size="mini">
          {this.state.text}
        </Loading>
      </button>
    );
  }
}
