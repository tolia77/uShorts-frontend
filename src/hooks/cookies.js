import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export default function useCookie(name) {
    const [value, setValue] = useState(Cookies.get(name) || ""); // Set the initial value correctly
    useEffect(() => {
        const cookie = Cookies.get(name);
        setValue(cookie);
    }, [name]); // Ensure the effect runs if the cookie name changes

    function setCookie(newValue, expires) {
        setValue(newValue);
        Cookies.set(name, newValue, { secure: true, expires: expires });
    }

    return {
        value,
        setCookie
    };
}
