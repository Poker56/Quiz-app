'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { questions } from '../questions'

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number[]>([])
  const router = useRouter()

  const handleSelect = (index: number) => {
    const updated = [...selected]
    updated[current] = index
    setSelected(updated)
  }

  const goToNext = () => {
    if (current < questions.length - 1) {
      setCurrent((prev) => prev + 1)
    } else {
      router.push(`/results?answers=${encodeURIComponent(JSON.stringify(selected))}`)
    }
  }

  const goToPrevious = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1)
    }
  }

  const question = questions[current]
  const selectedIndex = selected[current]

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-900">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Question {current + 1} of {questions.length}
        </h2>
        <p className="text-lg text-gray-700 mb-6">{question.question}</p>
        <ul className="space-y-3">
          {question.options.map((opt, i) => {
            const isSelected = i === selectedIndex
            return (
              <li
                key={i}
                onClick={() => handleSelect(i)}
                className={`p-3 rounded border cursor-pointer transition 
                ${
                  isSelected
                    ? 'bg-blue-100 border-blue-500 text-blue-900 font-semibold'
                    : 'bg-gray-50 hover:bg-gray-100 border-gray-300'
                }`}
              >
                {opt.text}
              </li>
            )
          })}
        </ul>
        <div className="mt-6 flex justify-between">
          <button
            onClick={goToPrevious}
            disabled={current === 0}
            className={`px-4 py-2 rounded ${
              current === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-500 text-white hover:bg-gray-600'
            }`}
          >
            Previous
          </button>
          <button
            onClick={goToNext}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {current === questions.length - 1 ? 'Submit' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
