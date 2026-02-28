type LoadingSpinnerProps = {
    size?: "w-6 h-6" | "h-8 w-8" | "h-12 w-12"
}

const LoadingSpinner = ({ size = "w-6 h-6" }: LoadingSpinnerProps) => {
    return (
        <div
            className={`border-3 border-white border-t-[#313638] rounded-full animate-spin ${size} mx-auto `}
        />
    )
}
export default LoadingSpinner
