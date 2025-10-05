
import React from 'react';
import type { InnovatorData } from '../types';

interface GuidedQuestionsProps {
  data: InnovatorData;
  onChange: (field: keyof InnovatorData, value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  canSubmit: boolean;
}

const QuestionTextarea: React.FC<{
    id: keyof InnovatorData;
    label: string;
    description: string;
    value: string;
    onChange: (field: keyof InnovatorData, value: string) => void;
}> = ({ id, label, description, value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-lg font-medium text-slate-200 mb-1">{label}</label>
        <p className="text-sm text-slate-400 mb-2">{description}</p>
        <textarea
            id={id}
            rows={4}
            className="w-full bg-slate-700/50 border border-slate-600 rounded-lg p-3 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all duration-300 text-slate-200 placeholder-slate-500"
            placeholder={`Describe your thoughts on ${label.toLowerCase()}...`}
            value={value}
            onChange={(e) => onChange(id, e.target.value)}
        />
    </div>
);


export const GuidedQuestions: React.FC<GuidedQuestionsProps> = ({ data, onChange, onSubmit, isLoading, canSubmit }) => {
  return (
    <div className="space-y-6">
      <QuestionTextarea
        id="domain"
        label="Technological Domain"
        description="What specific area are your innovations in? (e.g., renewable energy, decentralized finance, AI-driven healthcare)"
        value={data.domain}
        onChange={onChange}
      />
      <QuestionTextarea
        id="missingPiece"
        label="The Missing Piece"
        description="What is the single most critical thing that's missing for full implementation? (e.g., a specific material, public acceptance, a key algorithm)"
        value={data.missingPiece}
        onChange={onChange}
      />
      <QuestionTextarea
        id="supportNeeded"
        label="Support & Resources"
        description="What kind of support or resources would help bridge this gap? (e.g., seed funding, access to a research lab, mentorship)"
        value={data.supportNeeded}
        onChange={onChange}
      />
      <div className="pt-4 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={!canSubmit || isLoading}
          className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-lg shadow-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          {isLoading ? 'Generating...' : 'Generate Blueprint'}
        </button>
      </div>
    </div>
  );
};
