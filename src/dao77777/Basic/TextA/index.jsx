import React, { Component } from "react";
import "./index.scss";

/* 
  type
    string 
    default:wow 
    boring/wow/amazing
  color
    string 
    default:primary 
    primary/success/warning/danger
  disabled: 是否禁止点击
    boolean 
    default:false 
    false/true
  size
    string 
    default:base 
    base/medium/large
  weight
    string 
    default:base 
    base/bold
  children
*/
export class TextA extends Component {
  static defaultProps = {
    type: "wow",
    color: "primary",
    disabled: false,
    size: "base",
    weight: "base",
  };

  state = {
    textAWidth: 0,
    textAHeight: 0,
    strokeDasharray: 0,
    isFoward: true,
    isFirstLoad: true,
  };

  divRef = React.createRef();

  divClass = () => {
    const { type, color, disabled, size, weight } = this.props;
    const classArr = ["dao77777-TextA"];

    classArr.push(
      `type-${type}`,
      `color-${color}`,
      `disabled-${disabled}`,
      `size-${size}`,
      `weight-${weight}`
    );
    return classArr.join(" ");
  };

  divTransition = () => {
    const {
      props: { type },
      state: { isFoward },
    } = this;

    return type === "wow"
      ? "background-color 0.24s, color 0.24s"
      : type === "amazing"
      ? isFoward
        ? "background-color 0.24s 0.24s, color 0.24s 0.24s"
        : "background-color 0.24s, color 0.24s"
      : "unset";
  };

  spanTransition = () =>
    this.props.type === "amazing" ? "transform 0.48s" : "unset";

  polygonTransition = () => {
    const {
      props: { type },
      state: { isFirstLoad },
    } = this;
    return isFirstLoad
      ? "unset"
      : type === "amazing"
      ? "stroke-dasharray 0.24s"
      : "unset";
  };
  handleMouseEnter = () => {
    const {
      props: { disabled },
      state: { textAWidth, textAHeight },
    } = this;

    if (!disabled) {
      const length = (textAWidth + textAHeight) * 2;
      this.setState({
        strokeDasharray: length,
        isFoward: true,
      });
    }
  };

  handleMouseLeave = () => {
    const {
      props: { disabled },
      state: { textAHeight },
    } = this;

    if (!disabled) {
      this.setState({
        strokeDasharray: textAHeight,
        isFoward: false,
      });
    }
  };
  componentDidMount() {
    const { offsetWidth, offsetHeight } = this.divRef.current;
    this.setState({
      textAWidth: offsetWidth,
      textAHeight: offsetHeight,
      strokeDasharray: offsetHeight,
    });
    setTimeout(
      () =>
        this.setState({
          isFirstLoad: false,
        }),
      0
    );
  }

  render() {
    const {
      props,
      state: { textAWidth, textAHeight, strokeDasharray },
      divRef,
      divClass,
      divTransition,
      spanTransition,
      polygonTransition,
      handleMouseEnter,
      handleMouseLeave,
    } = this;

    return (
      <div
        ref={divRef}
        className={divClass()}
        style={{
          transition: divTransition(),
        }}
        {...props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span
          style={{
            transition: spanTransition(),
          }}
        >
          {props.children}
        </span>
        <svg>
          <polygon
            points={`0,${textAHeight} 0,0 ${textAWidth},0 ${textAWidth},${textAHeight}`}
            strokeDasharray={`${strokeDasharray} 1000`}
            style={{
              transition: polygonTransition(),
            }}
          ></polygon>
        </svg>
      </div>
    );
  }
}
