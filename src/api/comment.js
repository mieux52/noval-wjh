import request from "./http";

export function getcomment_lists(){
return request({
    url:"../json/comment.json",
    method:"get"
})
}