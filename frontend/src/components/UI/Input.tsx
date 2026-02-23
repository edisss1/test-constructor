import Button from "./Button"

type InputProps = {
    type: string
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label?: string
    icon?: React.ReactNode
    onClick?: () => void
}

const Input = ({
    type,
    placeholder,
    value,
    onChange,
    label,
    icon,
    onClick
}: InputProps) => {
    return (
        <div className="flex flex-col gap-2 w-full relative">
            {label && <label>{label}</label>}
            <div className="relative w-full">
                <input
                    className="border-2 border-text rounded-lg p-2 w-full"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
                {icon && (
                    <Button
                        type="button"
                        onClick={onClick}
                        className="absolute top-1/2 right-2 -translate-y-1/2"
                    >
                        {icon}
                    </Button>
                )}
            </div>
        </div>
    )
}
export default Input
