type InputProps = {
    type: string
    placeholder: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    label?: string
}

const Input = ({ type, placeholder, value, onChange, label }: InputProps) => {
    return (
        <div className="flex flex-col gap-2 w-full">
            {label && <label>{label}</label>}
            <input
                className="border-2 border-text rounded-lg px-2 py-1"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}
export default Input
