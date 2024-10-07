import request from "../http";

// 首页
export function getnewhome() {
    return request({
        url: "/yunyuedu/store/rankList.json?rankType=26&uuid=ca03da7b64ca443ab25ec3b662fa91e2&all=40",
        method: "get",
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

// 详情
export function getnewdetails(id, name) {
    console.log(id, name);
    return request({
        url: "/yunyuedu/book/getsub.json?id=" + id + "&title=" + name,
        method: "get",
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

// 章节目录
export function getchapter(id) {
    console.log(id);
    return request({
        url: "/yunyuedu/reader/book/info.json?source_uuid=" + id,
        method: "get",
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

// 章节详情
export function getchapterdetails(bookid, chapterid) {
    console.log(bookid);
    return request({
        url: "yunyuedu/reader/book/content.json?source_uuid=" + bookid + "&content_uuid=" + chapterid,
        method: "get",
        headers: {
            'content-type': 'application/json; charset=utf-8'
        }
    })
}

// 热门搜索
export function getHotsearch() {
    console.log();
    return request({
        url: "/yunyuedu/search/getHotWords",
        method: "get",

    })
}


// 搜索
export function getsearch(params) {
    return request({
        url: "/yunyuedu/search/book.json",
        method: "get",
        params

    })
}

// 评论
export function getcomment(params) {
    return request({
        url: "/yunyuedu/comment/getComments.json?",
        method: "get",
        params
    })
}
// 女生
//https://apis.netstart.cn/yunyuedu//store/show.json?type=femail&uuid=017de2274aa5400e9dabe30f173e98d9
export function getgirl() {
    return request({
        url: "yunyuedu/category/original/data.json?id=8&gender=female&sort=2&pay=0&state=0&page=1",
        method: "get",
        
    })
}