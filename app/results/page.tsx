'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { questions } from '../questions'
import { useEffect, useState } from 'react'

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [answers, setAnswers] = useState<number[]>([])

  useEffect(() => {
    const answersParam = searchParams.get('answers')
    if (answersParam) {
      try {
        setAnswers(JSON.parse(answersParam))
      } catch {
        console.error('Invalid answers param')
      }
    }
  }, [searchParams])

  const score = answers.reduce((acc, answer, i) => {
    const correctIndex = questions[i].options.findIndex((opt) => opt.correct)
    return acc + (answer === correctIndex ? 1 : 0)
  }, 0)

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-3xl space-y-6">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-2">🎉 Quiz Completed!</h1>
          <p className="text-lg text-gray-300 mb-4">
            You scored <span className="text-white font-semibold">{score}</span> out of{' '}
            {questions.length}
          </p>

          {/* Score Bar */}
          <div className="w-full bg-gray-700 h-4 rounded-full overflow-hidden mb-4">
            <div
              className="bg-green-500 h-full transition-all duration-500"
              style={{ width: `${(score / questions.length) * 100}%` }}
            ></div>
          </div>

          <button
            onClick={() => router.push('/quiz')}
            className="mt-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white font-medium"
          >
            Retake Quiz
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-200">📝 Review</h2>
          <div className="space-y-6">
            {questions.map((q, i) => {
              const selectedIndex = answers[i]
            

              return (
                <div key={i} className="bg-gray-800 p-5 rounded-lg shadow-md">
                  <p className="text-gray-300 mb-4 font-medium">
                    {i + 1}. {q.question}
                  </p>
                  <ul className="space-y-2">
                    {q.options.map((opt, j) => {
                      const isCorrect = opt.correct
                      const isSelected = j === selectedIndex

                      return (
                        <li
                          key={j}
                          className={`p-3 rounded transition-all border
                            ${
                              isCorrect
                                ? 'bg-green-700 border-green-500 text-white'
                                : isSelected
                                ? 'bg-red-700 border-red-500 text-white'
                                : 'bg-gray-700 border-gray-600 text-gray-300'
                            }`}
                        >
                          {opt.text}
                          {isCorrect && ' ✅'}
                          {isSelected && !isCorrect && ' ❌'}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
