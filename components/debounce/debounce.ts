import { useState, useEffect } from "react";



function Debounce() {
    function useDebounce(text, delay) {
        delay = delay || 500;
    
        const [debounced, setDebounced] = useState(text);
    
        useEffect(() => {
            const handler = setTimeout(() => {
                setDebounced(text);
            }, delay);
    
            return () => {
                clearTimeout(handler);
            };
        }, [text, delay]);
    
        return debounced;
    }
    const [val, setVal] = useState("OK")
    const [title, setTitle] = useState("ok")
    const debouncedVal = useDebounce(val,  500  );

    useEffect(() => {
        if (debouncedVal) {
            setTitle(debouncedVal)
        }
    }, [debouncedVal])
}