import { http } from "./init";

// home

async function home_getArticleCardArray(pageNum) {
  return await http({
    url: "/home/home_getArticleCardArray",
    data: { pageNum }
  })
}

async function home_routerLink_blogLink_getAuthorInfo(nickname, signature) {
  return await http({
    url: "/admin/user/login",
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
