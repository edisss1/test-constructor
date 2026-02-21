type ButtonProps = {
    children: React.ReactNode
    onClick?: () => void
    type: "submit" | "button"
    disabled?: boolean
}

const Button = ({ children, onClick, disabled, type }: ButtonProps) => {
    return (
        <button
            disabled={disabled}
            type={type}
            className="bg-primary text-white w-full py-2 rounded-lg max-w-62.5 cursor-pointer disabled:opacity-50"
            onClick={onClick}
        >
            {children}
        </button>
    )
}
export default Button
