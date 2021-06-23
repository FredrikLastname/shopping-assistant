import Cookies from "js-cookie"

const setCookie =(uid, expires = 2)=>{
    Cookies.set("user", uid, {expires: expires})
}

const readCookie = () =>{
    return Cookies.get("user")
}

const removeCookie = () =>{
    Cookies.remove("user")
}

export {setCookie, readCookie, removeCookie}