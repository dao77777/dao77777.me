// 常量与状态
const messageBorderRadius = "5px";
const messageMarginTop = "10px";
const messagePadding = "5px 20px 5px 15px";
const messageBackgroundColor = {
  info: "#2e405b",
  success: "#5BAE23",
  warning: "#E2C027",
  error: "#F05A46",
};
const messageFontSize = "14px";
const messageFontColor = {
  info: "#9db0c2",
  success: "#E2F2D8",
  warning: "#F2EDD8",
  error: "#F2D8D8",
};
const iconSize = "16px";
const pMarginLeft = "10px";
let oldMessageArr = [];
let messageArr = []; // type message key

// 事件处理与绑定
const eventContainer = {};
function listen(eventName, callback) {
  if (eventContainer[eventName]) {
    eventContainer[eventName].push(callback);
  } else {
    eventContainer[eventName] = [callback];
  }
}
function dispatch(eventName, eventMessage) {
  if (eventContainer[eventName]) {
    eventContainer[eventName].forEach((item) => {
      item(eventMessage);
    });
  }
}
// function remove(eventName, callback) {
//   if (eventContainer[eventName]) {
//     eventContainer[eventName] = eventContainer[eventName].filter(
//       (item) => item !== callback
//     );
//   }
// }
// function clear(eventName) {
//   if (eventContainer[eventName]) {
//     delete eventContainer[eventName];
//   }
// }

listen("stateChange", () => {
  render();
});
listen("notNone", () => {
  const interval = setInterval(() => {
    shift();
    if (messageArr.length === 0) {
      clearInterval(interval);
    }
  }, 2000);
});

// 副作用函数
let key = 0;
function generateKey() {
  return key++;
}

function push(type, message) {
  if (
    (type !== "info" &&
      type !== "success" &&
      type !== "warning" &&
      type !== "error") ||
    typeof message !== "string"
  )
    return;

  if (messageArr.length === 0) dispatch("notNone");
  messageArr.push({
    type,
    message,
    key: generateKey(),
  });
  dispatch("stateChange");
}

function shift() {
  messageArr.shift();
  dispatch("stateChange");
}

// 渲染函数
function render() {
  let messageContainer = document.querySelector("body>#messageContainer");

  if (!messageContainer) {
    const root = document.querySelector("#root");
    messageContainer = document.createElement("div");
    messageContainer.setAttribute("id", "messageContainer");
    messageContainer.style.position = "fixed";
    messageContainer.style.top = messageMarginTop;
    messageContainer.style.left = "50%";
    messageContainer.style.display = "flex";
    messageContainer.style.flexDirection = "column";
    messageContainer.style.alignItems = "center";
    messageContainer.style.transform = "translateX(-50%)";
    messageContainer.style.userSelect = "none";
    document.body.insertBefore(messageContainer, root);
  }

  const operation = domDiff();
  switch (operation) {
    case "push":
      const element = createMessageElement(messageArr[messageArr.length - 1]);
      messageContainer.appendChild(element);
      break;
    case "remove":
      messageContainer.removeChild(
        document.querySelector("body>#messageContainer>div:nth-of-type(1)")
      );
      break;
    default:
      break;
  }
  oldMessageArr = [...messageArr];

  function domDiff() {
    if (oldMessageArr.length === 0 || oldMessageArr[0] === messageArr[0]) {
      return "push";
    } else {
      return "remove";
    }
  }

  // async function transition() {
  //   const operation = domDiff();
  //   switch (operation) {
  //     case "push":
  //       render();
  //       const pushElement = document.querySelector("body>#messageContainer>div:last-child");
  //       pushElement.style.opacity = 0;

  //       break;

  //     case "remove":
  //       break;
  //     default:
  //       break;
  //   }
  // }

  function createMessageElement(item) {
    const icon = {
      info: "#icon-info",
      success: "#icon-success",
      warning: "#icon-warning",
      error: "#icon-error_3",
    };
    const div = document.createElement("div");
    div.setAttribute("key", item.key);
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.borderRadius = messageBorderRadius;
    div.style.padding = messagePadding;
    div.style.marginTop = messageMarginTop;
    div.style.backgroundColor = messageBackgroundColor[item.type];
    div.style.fontSize = messageFontSize;
    div.style.color = messageFontColor[item.type];
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("width", iconSize);
    svg.setAttribute("height", iconSize);
    svg.style.width = iconSize;
    svg.style.height = iconSize;
    const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", icon[item.type]);
    const p = document.createElement("p");
    p.style.marginLeft = pMarginLeft;
    p.innerHTML = item.message;

    svg.appendChild(use);
    div.appendChild(svg);
    div.appendChild(p);

    return div;
  }
}

export function message() {
  return {
    messageSend: push,
  };
}