// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 to-blue-900 text-white">
      <div className="text-center space-y-6 max-w-xl px-4">
        <h1 className="text-4xl md:text-5xl font-bold">Welcome to the Ultimate Quiz!</h1>
        <p className="text-lg text-gray-300">
          Test your knowledge with a quick quiz. Are you ready to challenge yourself?
        </p>
        <button
          onClick={() => router.push('/quiz')}
          className="mt-4 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition duration-300"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
