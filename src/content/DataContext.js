import { createContext, useState, useContext } from 'react';
import useDatabase from '../hooks/useDatabase';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const fetchData = useDatabase("fetch");
  
  const updateData = (newData) => {
    setData([...data, newData]);
  };
  
  const refreshData = async (page, index) => {
    fetchData(page, index).then(results => {
        setData(results)
    })
  };

  return (
    <DataContext.Provider value={{ data, setData, updateData, refreshData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}