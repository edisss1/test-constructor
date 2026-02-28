import LoadingSpinner from "../UI/LoadingSpinner"

const LoadingOverlay = () => {
    return (
        <div className="h-screen w-screen bg-white flex items-center justify-center">
            <LoadingSpinner size="h-12 w-12" />
        </div>
    )
}
export default LoadingOverlay
