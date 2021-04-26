import { http } from "./init";
import { formTime } from "../tools/formTime";

// home
async function home_getArticleCardArray(pageNum) {
  // 请求
  const res = await http({
    url: "/home/getArticleCardArray",
    data: { pageNum }
  })

  // 返回值处理
  if (res.status === 200) {
    const processedRes = { ...res, data: res.data.map(item => ({ ...item, timeCreate: formTime(item.timeCreate) })) };
    return processedRes;
  }

  return res;
}

async function home_routerLink_blogLink_getAuthorInfo(nickname, signature) {
  return await http({
    url: "/home/routerLink/blogLink/getAuthorInfo",
    data: { nickname, signature },
  })
}

async function home_articleCard_updateClickCount(id) {
  return await http({
    url: "/home/articleCard/updateClickCount",
    data: { id },
  })
}

// article
async function article_content_getArticle(id) {
  return await http({
    url: "/article/content/getArticle",
    data: { id },
  })
}
async function article_comment_getComment(id) {
  return await http({
    url: "/article/comment/getComment",
    data: { id },
  })
}
async function article_comment_insertCommit(id, nickname, email, site, content) {
  return await http({
    url: "/article/comment/insertCommit",
    data: { id, nickname, email, site, content },
  })
}
async function article_comment_commentCard_insertCommit(id, nickname, email, site, content) {
  return await http({
    url: "/article/comment/commentCard/insertCommit",
    data: { id, nickname, email, site, content },
  })
}

export function remoteApi() {
  return {
    home_getArticleCardArray,
    home_routerLink_blogLink_getAuthorInfo,
    home_articleCard_updateClickCount,
    article_content_getArticle,
    article_comment_getComment,
    article_comment_insertCommit,
    article_comment_commentCard_insertCommit
  }
}
