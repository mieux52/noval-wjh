import request from "./http";

export function gettopic_lists(){
return request({
    url:"../json/topic.json",
    method:"get"
})
}