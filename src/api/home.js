import request from "./http";

export function getindex_lists(){
return request({
    url:"../json/home.json",
    method:"get"
})
}