import { useEffect, useState } from "react";

const useLocalStorage = <T>(key: string, intialValue: T | (() => T)) => {

    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if(jsonValue == null) {
            if(typeof intialValue === 'function'){ 
                return (intialValue as () => T)();
            } else {
                return intialValue;
            }

        } else {
            return JSON.parse(jsonValue);
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key])

    return [value, setValue] as [T, typeof setValue]
}

export default useLocalStorage;


