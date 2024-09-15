import { useEffect, useState } from "react";

export function useLocalStorage(key, initialvalue) {
    const [data, setdata] = useState(initialvalue)
    useEffect(() => {
        const existingdata = JSON.parse(localStorage.getItem(key))
        if (existingdata) {
            // console.log('existing');
            setdata(existingdata)
        }
        else {
            // console.log('Not existing');
            localStorage.setItem(key, JSON.stringify(initialvalue))
        }
    }, [])
    const updatelocalstorage = (newdata) => {
        if (typeof newdata === 'function') {
            // console.log(data);
            localStorage.setItem(key, JSON.stringify(newdata(data)))
        }
        else {
            // console.log(newdata);
            
            localStorage.setItem(key, JSON.stringify(newdata))
        }
        setdata(newdata)
    }
    // console.log(data);
    
    return [data, updatelocalstorage]
}