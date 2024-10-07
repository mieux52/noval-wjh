import request from "./http";

export function getdetail_lists(){
return request({
    url:"../json/detail.json",
    method:"get"
})
}