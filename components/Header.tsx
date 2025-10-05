
import React from 'react';

const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-center text-center py-4">
      <div className="flex items-center gap-4">
        <SparkleIcon />
        <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
          Innovator's Blueprint
        </h1>
        <SparkleIcon />
      </div>
    </header>
  );
};
