import request from "./http";

export function getlogon_lists(){
return request({
    url:"../json/logon.json",
    method:"get"
})
}