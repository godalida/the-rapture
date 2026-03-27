import React from 'react';
import { useVerse } from '../context/VerseContext';

interface BibleVerseProps {
  text: string;
  className?: string;
}

export const BibleVerse: React.FC<BibleVerseProps> = ({ text, className }) => {
  const { openVerse } = useVerse();

  // Regex to find Bible verse references (e.g., "1 Thess 4:16", "Rev 10:1", "Luke 17:26–30")
  const verseRegex = /([1-3]? ?[A-Za-z]+ [0-9]+:[0-9]+(?:–[0-9]+)?)/g;

  const parts = text.split(verseRegex);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        if (part.match(verseRegex)) {
          return (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                openVerse(part);
              }}
              className="text-amber-400/80 hover:text-amber-400 underline underline-offset-4 decoration-amber-500/30 hover:decoration-amber-500/60 transition-all cursor-pointer font-medium"
            >
              {part}
            </button>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </span>
  );
};
