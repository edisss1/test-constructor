type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    type?: "submit" | "button"
    disabled?: boolean
    className?: string
}

const Button = ({
    children,
    onClick,
    disabled,
    type,
    className
}: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            type={type}
            className={
                className
                    ? className
                    : "bg-primary hover:opacity-80 text-white w-full py-3 rounded-lg max-w-75 cursor-pointer disabled:opacity-50 transition-opacity duration-300"
            }
            onClick={onClick}
        >
            {children}
        </button>
    )
}
export default Button
