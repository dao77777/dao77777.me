import React from 'react';
import "./index.scss";

// const props = {
//   isShow: true
// }

export function Dialog(props) {
  // 默认属性
  if (props.isShow === undefined) props.isShow = false;

  return (
    <div className={props.isShow ? "dao77777-Dialog" : "dao77777-Dialog none"}>
      <main>{props.children}</main>
    </div>
  )
}
