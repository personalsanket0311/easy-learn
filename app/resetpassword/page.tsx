'use client';

import { useState } from 'react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Handle password reset logic here (e.g., API call)
    console.log('Password reset successfully:', password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-white font-sans">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Reset your password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block font-medium mb-1">
              New Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block font-medium mb-1">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-blue-100 text-black font-semibold hover:bg-blue-200 transition"
          >
            Reset Password
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
