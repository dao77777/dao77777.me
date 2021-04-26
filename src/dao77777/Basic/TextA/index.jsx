import { useState } from "react";
import "./index.scss";

export function TextA(props) {
  // 状态
  const [isHover, setIsHover] = useState(false);
  // 属性
  let { size, color, children } = props;
  size || (size = "base");
  color || (color = "info");
  // 域外
  const { onClick } = props;
  // 监听
  function click() {
    onClick();
  }
  function mouseOver() {
    setIsHover(true);
  }
  function mouseOut() {
    setIsHover(false);
  }

  const processedSize = size === "mini" ? 12 : size === "base" ? 14 : size === "large" ? 18 : size;
  const processedColor = color === "info" ? "#2e405b" : color === "success" ? "#5bae23" : color === "warning" ? "#e2c027" : color === "error" ? "#f05a46" : color;
  return (
    <span className="dao77777-TextA" onClick={click} onMouseOver={mouseOver} onMouseOut={mouseOut} style={{
      borderWidth: processedSize >= 20 ? 2 : 1,
      borderColor: processedColor,
      fontSize: processedSize,
      color: isHover ? "#ffffff" : processedColor,
      backgroundColor: isHover ? processedColor : "unset"
    }}>{children}</span>
  )
}