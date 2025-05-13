export type Option = {
  text: string
  correct?: boolean
}

export type Question = {
  id: number
  question: string
  options: Option[]
}

export const questions: Question[] = [
  {
    id: 1,
    question: 'What is the capital of France?',
    options: [
      { text: 'Berlin' },
      { text: 'Madrid' },
      { text: 'Paris', correct: true },
      { text: 'Rome' },
    ],
  },
  {
    id: 2,
    question: 'Which planet is known as the life Planet?',
    options: [
      { text: 'Earth', correct: true },
      { text: 'Venus',  },
      { text: 'Mars' },
      { text: 'Jupiter' },
    ],
  },
  // Add more up to 20...
]
