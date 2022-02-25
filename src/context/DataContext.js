import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [categories, setCategories] = useState([
    "all",
    "dress",
    "tshirts",
    "pants",
    "shorts",
    "heels",
  ]);

  return (
    <DataContext.Provider
      value={{
        categories,
        setCategories,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
