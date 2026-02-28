type QuestionCardProps = {
    question: string
    answers: string[]
    index: number
}

const QuestionCard = ({ question, answers, index }: QuestionCardProps) => {
    return (
        <div className="w-full max-w-212.5 min-h-50 rounded-lg p-4 bg-secondary">
            <div className="flex justify-between items-center">
                <h2 className="font-semibold">
                    {index + 1}. {question}
                </h2>
            </div>
        </div>
    )
}
export default QuestionCard
