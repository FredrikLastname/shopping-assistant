import Cookies from "js-cookie"

const setCookie =(uid, expires = 5)=>{
    Cookies.set("shoppingAssistantCookie", uid, {expires: expires})
}

const readCookie = () =>{
    return Cookies.get("shoppingAssistantCookie")
}

const removeCookie = () =>{
    Cookies.remove("shoppingAssistantCookie")
}

export {setCookie, readCookie, removeCookie}