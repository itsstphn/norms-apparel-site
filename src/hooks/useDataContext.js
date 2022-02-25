import { useContext } from "react";
import { DataContext } from "./../context/DataContext";

export const useDataContext = () => {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("DataContext must be inside a DataContextProvider");
  }

  return context;
};
