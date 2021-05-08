import { request } from "./init";
import { formTime } from "../utils/formTime";

// store
async function store_getBlogInfo() {
  return await request({
    url: "/store/getBlogInfo",
  })
}

// home
async function home_getArticleCardArray(pageNum) {
  // 请求
  const res = await request({
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

async function home_articleCard_updateClickCount(id) {
  return await request({
    url: "/home/articleCard/updateClickCount",
    data: { id },
  })
}

// article
async function article_content_getArticle(id) {
  // 请求
  const res = await request({
    url: "/article/content/getArticle",
    data: { id },
  })

    // 返回值处理
    if (res.status === 200) {
      const processedRes = { ...res, data: { ...res.data, timeCreate: formTime(res.data.timeCreate) } };
      return processedRes;
    }
  
    return res;
}
async function article_comment_getComment(id) {
  // 请求
  const res = await request({
    url: "/article/comment/getComment",
    data: { id },
  })

  // 返回值处理
  function dfs(forest) {
    if (forest.length === 0) return [];

    const firstTree = forest[0];
    const remainForest = forest.slice(1);
    const childForest = firstTree.children;

    return [{ ...firstTree, timeCreate: formTime(firstTree.timeCreate), children: dfs(childForest) }, ...dfs(remainForest)];
  }
  return { ...res, data: dfs(res.data) };
}
async function article_comment_insertCommit(id, nickname, email, site, content) {
  return await request({
    url: "/article/comment/insertCommit",
    data: { id, nickname, email, site, content },
  })
}
async function article_comment_commentCard_insertCommit(id, nickname, email, site, content) {
  return await request({
    url: "/article/comment/commentCard/insertCommit",
    data: { id, nickname, email, site, content },
  })
}

export function remoteApi() {
  return {
    store_getBlogInfo,
    home_getArticleCardArray,
    home_articleCard_updateClickCount,
    article_content_getArticle,
    article_comment_getComment,
    article_comment_insertCommit,
    article_comment_commentCard_insertCommit
  }
}
