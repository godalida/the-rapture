import React, { createContext, useContext, useState, useCallback } from 'react';

interface VerseContextType {
  openVerse: (reference: string) => void;
  closeVerse: () => void;
  currentVerse: string | null;
  isOpen: boolean;
}

const VerseContext = createContext<VerseContextType | undefined>(undefined);

export const VerseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentVerse, setCurrentVerse] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openVerse = useCallback((reference: string) => {
    setCurrentVerse(reference);
    setIsOpen(true);
  }, []);

  const closeVerse = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setCurrentVerse(null), 300); // Wait for exit animation
  }, []);

  return (
    <VerseContext.Provider value={{ openVerse, closeVerse, currentVerse, isOpen }}>
      {children}
    </VerseContext.Provider>
  );
};

export const useVerse = () => {
  const context = useContext(VerseContext);
  if (context === undefined) {
    throw new Error('useVerse must be used within a VerseProvider');
  }
  return context;
};
