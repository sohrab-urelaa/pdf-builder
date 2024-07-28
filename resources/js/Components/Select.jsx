export function Select({
    className = "",
    isFocused = false,
    children,
    ...props
}) {
    return (
        <select
            {...props}
            className={
                // "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm " +
                "input input-bordered input-primary w-full " + className
            }
        >
            {children}
        </select>
    );
}
