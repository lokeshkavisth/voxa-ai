"use client";

import React, { createContext, useState } from "react";

const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [data, setData] = useState({});

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
