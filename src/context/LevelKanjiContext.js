"use client";
import React, { createContext, useContext, useState } from "react";

export const LevelKanjiContext = createContext(null);

export function useKanjiContext() {
  return useContext(LevelKanjiContext);
}

export function LevelKanjiProvider({ levelKanji, children }) {
  const [quizLength, setQuizLength] = useState(20);
  const sharedData = {
    levelKanji,
    quizLength,
    setQuizLength,
  };
  return (
    <LevelKanjiContext.Provider value={sharedData}>
      {children}
    </LevelKanjiContext.Provider>
  );
}
