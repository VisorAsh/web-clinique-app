"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard">
                <span className="text-xl font-bold text-blue-600">Clinique Totsi</span>
              </Link>
            </div>

            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/dashboard" className="border-blue-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Dashboard
              </Link>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <div className="ml-3 relative">
              <div>
                <button className="bg-white rounded-md flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                    U
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/dashboard" className="bg-blue-50 border-blue-500 text-blue-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
            Dashboard
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                U
              </div>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">User Name</div>
              <div className="text-sm font-medium text-gray-500">user@example.com</div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <button className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
