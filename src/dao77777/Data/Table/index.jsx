import React, { Component } from "react";
import "./index.scss";

/* 
  column
    object
    default: []
  dataSource
    object
    default: []
  height
    string
    default: "50px"
*/

export class Table extends Component {
  static defaultProps = {
    column: [],
    dataSource: [],
    height: "50px",
  };

  columnTitle = () => {
    const {
      column,
      height,
    } = this.props;

    return column.map((item, index) => (
      <div
        className="item"
        style={{ maxWidth: item.width, minWidth: item.width, height: height }}
        key={index}
      >
        {item.title}
      </div>
    ));
  };

  columnItems = () => {
    const {
      column,
      dataSource,
      height,
    } = this.props;

    return dataSource.map((item, index) => (
      <div className="column-row" key={index}>
        {column.map((columnsItem, columnsIndex) => (
          <div
            className="item"
            style={{
              maxWidth: columnsItem.width,
              minWidth: columnsItem.width,
              height: height,
            }}
            key={columnsIndex}
          >
            {item[columnsItem.dataIndex]}
          </div>
        ))}
      </div>
    ));
  };

  render() {
    const { columnTitle, columnItems } = this;

    return (
      <div className="dao77777-Table">
        <div className="column-row">{columnTitle()}</div>
        {columnItems()}
      </div>
    );
  }
}
