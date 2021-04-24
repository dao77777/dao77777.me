import React, { useEffect, useState } from "react";
import "./index.scss";
import { Open } from "../index";

// const props = {
//   navTree: [
//     {
//       self: "用户管理",
//       children: [
//         { self: "用户列表", children: [] },
//         { self: "用户添加", children: [] },
//       ],
//     },
//     {
//       self: "角色管理",
//       children: [
//         { self: "添加角色", children: [] },
//         { self: "角色列表", children: [] },
//       ],
//     },
//   ],
//   value: "",
//   onChange: () => {}
// };

export function Nav(props) {
  const [openArray, setOpenArray] = useState([]);

  function onOpenClick(path) {
    return () => {
      const index = isInOpenArray(path, openArray);
      if (index === -1) {
        setOpenArray([...openArray, path.join("-")]);
      } else {
        const newArr = [...openArray];
        newArr.splice(index, 1);
        setOpenArray(newArr);
      }
    };
  }

  function onLastSelfClick(path) {
    return () => {
      if (props.value === undefined) {
        setLastSelfFromOpenArray(path);
      } else {
        path.unshift("lastSelf");
        const index = isInOpenArray(path, openArray);
        if (index === -1) {
          path.shift();
          if (props.onChange) props.onChange(path.join("-"));
        }
      }
    };
  }

  useEffect(() => {
    if (props.value) {
      const path =
        typeof props.value.split("-") === "string"
          ? [props.value]
          : props.value.split("-");
      const newOpenArray = path.map((item, index, arr) => {
        let res = "";
        for (let i = 0; i <= index; i++) {
          if (i === 0) {
            res += arr[i];
          } else {
            res += "-" + arr[i];
          }
        }
        if (index === arr.length - 1) {
          res = "lastSelf-" + res;
        }
        return res;
      });
      setOpenArray(newOpenArray);
    }
  }, []);

  useEffect(() => {
    if (props.value)
      setLastSelfFromOpenArray(
        typeof props.value.split("-") === "string"
          ? [props.value]
          : props.value.split("-")
      );
  }, [props.value]);

  function renderNavTree() {
    let path = [];

    function dfs(tree) {
      return tree.map((item, index) => {
        path.push(index.toString());
        const isLastSelf = item.children.length === 0;
        const isIn =
          isInOpenArray(
            isLastSelf ? ["lastSelf", ...path] : path,
            openArray
          ) !== -1;

        const res = (
          <div className={isIn ? "item active" : "item"} key={index}>
            <div
              className={isLastSelf ? "self last" : "self"}
              style={isLastSelf ? { cursor: "pointer" } : {}}
              onClick={isLastSelf ? onLastSelfClick([...path]) : null}
            >
              <div
                className="insert"
                style={{ paddingLeft: (path.length - 1) * 20 + "px" }}
              >
                {item.self}
              </div>
              <div className="open" onClick={onOpenClick([...path])}>
                <Open
                  className="openComponent"
                  color="#fff"
                  size="mini"
                  opened={isIn}
                ></Open>
              </div>
            </div>
            <div
              className="children"
              style={{
                height: isIn ? 50 * item.children.length : 0,
              }}
            >
              {dfs(item.children)}
            </div>
          </div>
        );
        path.pop(index);
        return res;
      });
    }

    return dfs(props.navTree);
  }

  function isInOpenArray(path, openArray) {
    let indexOfOpenArray = -1;
    openArray.forEach((item, index) => {
      const openPath =
        typeof item.split("-") === "string" ? [item] : item.split("-");
      const isEqual =
        openPath.length === path.length &&
        path.every((item, index) => {
          try {
            return item === openPath[index];
          } catch (error) {
            return false;
          }
        });
      if (isEqual) {
        indexOfOpenArray = index;
      }
    });
    return indexOfOpenArray;
  }

  function removeLastSelfFromOpenArray(openArray) {
    return openArray.filter(
      (item) =>
        (typeof item.split("-") === "string" ? item : item.split("-")[0]) !==
        "lastSelf"
    );
  }

  function setLastSelfFromOpenArray(path) {
    path.unshift("lastSelf");
    setOpenArray((pre) => {
      const index = isInOpenArray(path, pre);
      if (index === -1) {
        const removedOpenArray = removeLastSelfFromOpenArray(pre);
        return [...removedOpenArray, path.join("-")];
      } else {
        return pre;
      }
    });
  }

  return <div className="dao77777-Nav">{renderNavTree()}</div>;
}
