
import React from 'react';

interface BlueprintDisplayProps {
  content: string;
}

// A simple parser to handle markdown-like headers and lists
const FormattedContent: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');

  return (
    <>
      {lines.map((line, index) => {
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-semibold text-cyan-300 mt-6 mb-3">
              {line.substring(4)}
            </h3>
          );
        }
        if (line.startsWith('* ') || line.startsWith('- ')) {
          return (
            <li key={index} className="ml-5 list-disc list-outside text-slate-300 mb-2">
              {line.substring(2)}
            </li>
          );
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        return <p key={index} className="text-slate-300 leading-relaxed">{line}</p>;
      })}
    </>
  );
};


export const BlueprintDisplay: React.FC<BlueprintDisplayProps> = ({ content }) => {
  return (
    <div className="bg-slate-800/50 p-6 md:p-8 rounded-2xl shadow-2xl border border-slate-700 animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 mb-6">
        Your Innovator's Blueprint
      </h2>
      <div className="prose prose-invert max-w-none prose-p:text-slate-300 prose-headings:text-cyan-400 prose-li:text-slate-300">
        <FormattedContent text={content} />
      </div>
    </div>
  );
};
