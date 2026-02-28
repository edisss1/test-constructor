import { useState } from "react"
import Navbar from "../components/Layout/Navbar"
import type { Question } from "../types/Question.type"
import NewQuestionCard from "../components/Layout/NewQuestionCard"

const NewTestPage = () => {
    const [testTitle, setTestTitle] = useState("New test")
    const [questions, setQuestions] = useState<Question[]>([])

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            {
                question: "Untitled question",
                answers: ["Untitled option"],
                multipleVariants: false,
                correctAnswer: []
            }
        ])
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-center gap-4 mt-8">
                {questions.map((question, i) => (
                    <NewQuestionCard
                        questionAnswers={question.answers}
                        questionCorrectAnswer={question.correctAnswer}
                        questionMultipleVariants={question.multipleVariants}
                        questionTitle={question.question}
                        key={i}
                    />
                ))}
                <NewQuestionCard />
            </div>
        </>
    )
}
export default NewTestPage
