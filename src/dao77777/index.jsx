const remoteAssetsUrl = "http://at.alicdn.com/t/font_2476609_6ztf9kex1wu.js";
const script = document.createElement("script");
script.setAttribute("src", remoteAssetsUrl);
const style = document.createElement("style");
style.setAttribute("type", "text/css");
style.innerHTML = `
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }`;

document.body.appendChild(script);
document.body.appendChild(style);

export { message } from "./Message";

export { Button } from "./Basic/Button";
export { Loading } from "./Basic/Loading";
export { Open } from "./Basic/Open";
export { TextA } from "./Basic/TextA";
export { Input } from "./Basic/Input";

export { Nav } from "./Nav";

export { Table } from "./Data/Table";

export { Dialog } from "./Dialog";
