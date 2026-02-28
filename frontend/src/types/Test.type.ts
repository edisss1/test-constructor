import type { Question } from "./Question.type"

export type Test = {
    id: string
    creatorID: string
    name: string
    questions: Question[]
    createdAt: string
}
