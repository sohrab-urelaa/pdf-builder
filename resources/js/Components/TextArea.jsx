import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextArea(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            type={type}
            className={"textarea textarea-primary w-full " + className}
            ref={input}
        />
    );
});
