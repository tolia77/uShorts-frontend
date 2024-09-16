import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function useCookie(name) {
    const [value, setValue] = useState(Cookies.get(name) || ""); // Set the initial value correctly
    useEffect(() => {
        const cookie = Cookies.get(name);
        setValue(cookie);
    }, [name]);

    function setCookie(newValue, expires) {
        setValue(newValue);
        Cookies.set(name, newValue, { secure: true, expires: expires });
    }

    function removeCookie() {
        setValue("")
        Cookies.remove(name, {path: "/"});
    }

    return {
        value,
        setCookie,
        removeCookie
    };
}
