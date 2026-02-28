import { useState } from "react"
import Button from "../UI/Button"

type NewQuestionCardProps = {
    questionTitle?: string
    questionMultipleVariants?: boolean
    questionAnswers?: string[]
    questionCorrectAnswer?: number[]
}

const NewQuestionCard = ({
    questionTitle,
    questionMultipleVariants,
    questionAnswers,
    questionCorrectAnswer
}: NewQuestionCardProps) => {
    const [newQuestionTitle, setNewQuestionTitle] = useState(
        questionTitle || "Untitled question"
    )
    const [multipleVariants, setMultipleVariants] = useState(
        questionMultipleVariants || false
    )
    const [answers, setAnswers] = useState<string[]>(questionAnswers || [])
    const [correctAnswer, setCorrectAnswer] = useState<number[]>(
        questionCorrectAnswer || []
    )

    const handleAddAnswer = () => {
        setAnswers([...answers, "Untitled option"])
    }
    const handleCorrectAnswer = (i: number) => {
        if (multipleVariants) {
            setCorrectAnswer((prev) =>
                prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
            )
        } else {
            setCorrectAnswer([i])
        }
    }

    return (
        <div className="w-full max-w-212.5 min-h-50 rounded-lg p-4 bg-secondary">
            <div className="flex justify-between items-center">
                <input
                    value={newQuestionTitle}
                    onChange={(e) => setNewQuestionTitle(e.target.value)}
                    type="text"
                    className="focus:outline-none border-b"
                />
                <Button
                    className="bg-primary text-white px-4 py-2 rounded-lg"
                    onClick={() => setMultipleVariants(!multipleVariants)}
                >
                    {multipleVariants ? "Multiple variants" : "Single variant"}
                </Button>
            </div>
            <div className="flex flex-col gap-6 items-start mt-6">
                {answers.map((answer, i) => (
                    <div className="flex items-center gap-2 ">
                        <input type={multipleVariants ? "checkbox" : "radio"} />
                        <input
                            className={`focus:outline-none border-b ${correctAnswer.includes(i) ? "border-primary" : ""}`}
                            type="text"
                            value={answer}
                        />
                        <Button
                            onClick={() => handleCorrectAnswer(i)}
                            className="cursor-pointer hover:opacity-80 transition-opacity duration-300"
                        >
                            Mark as correct
                        </Button>
                    </div>
                ))}
                <Button
                    onClick={handleAddAnswer}
                    className="bg-primary text-white px-4 py-2 rounded-lg"
                >
                    Add answer
                </Button>
            </div>
        </div>
    )
}
export default NewQuestionCard
