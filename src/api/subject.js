import request from "./http";

export function getsubject_lists(){
return request({
    url:"../json/subject.json",
    method:"get"
})
}