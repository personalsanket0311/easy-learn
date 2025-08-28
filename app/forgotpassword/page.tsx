'use client';

import { useState } from 'react';

const ForgetPassword:React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submit logic here (e.g., API call)
    console.log('Reset link sent to:', email);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white font-sans">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot your password?</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block font-medium mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-blue-100 text-black font-semibold hover:bg-blue-200 transition"
          >
            <a href="/resetpassword" className="font-medium text-black hover:underline">Send reset link</a>
            
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Remember your password?{' '}
          <a href="/signin" className="font-medium text-black hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
export default ForgetPassword;