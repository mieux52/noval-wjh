import request from "./http";

export function getgirl_lists(){
return request({
    url:"../json/girl.json",
    method:"get"
})
}