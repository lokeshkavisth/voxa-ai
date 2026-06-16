"use client";

import React, { createContext, useCallback, useEffect, useState } from "react";

const QUIZ_SESSION_KEY = "voxa-quiz-session";
const QUIZ_RESULT_KEY = "voxa-quiz-result";

const DataContext = createContext(null);

function readStorage(key) {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

const DataProvider = ({ children }) => {
  const [data, setDataState] = useState({});

  useEffect(() => {
    const session = readStorage(QUIZ_SESSION_KEY);
    const result = readStorage(QUIZ_RESULT_KEY);
    setDataState((prev) => ({
      ...prev,
      ...(session || {}),
      ...(result ? { results: result } : {}),
    }));
  }, []);

  const setData = useCallback((updates) => {
    setDataState((prev) => {
      const next = { ...prev, ...updates };

      if (updates.questions) {
        sessionStorage.setItem(
          QUIZ_SESSION_KEY,
          JSON.stringify({
            questions: updates.questions,
            topic: updates.topic,
          })
        );
      }

      if (updates.results) {
        sessionStorage.setItem(
          QUIZ_RESULT_KEY,
          JSON.stringify(updates.results)
        );
      }

      return next;
    });
  }, []);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider, QUIZ_SESSION_KEY, QUIZ_RESULT_KEY };
