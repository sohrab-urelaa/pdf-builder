export default function InputLabel({
    value,
    className = "",
    children,
    ...props
}) {
    return (
        <label
            {...props}
            className={
                `block font-medium text-sm text-base-content ` + className
            }
        >
            {value ? value : children}
        </label>
    );
}
