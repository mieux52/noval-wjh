import request from "./http";

export function gettype_lists(){
return request({
    url:"../json/type.json",
    method:"get"
})
}