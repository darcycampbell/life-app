import { createContext, useState, useContext, useCallback } from 'react';
import useDatabase from '../hooks/useDatabase';
import useQuery from '../hooks/useQuery';

const DataContext = createContext();

export function DataProvider({ children }) {
  const getData = useDatabase();
  const getQuery = useQuery();
  const [data, setData] = useState([]);
  const [page, setPage] = useState()
  
/*   const updateData = (newData) => {
    setData([...data, newData]);
  }; */
  
  const refreshData = useCallback(async () => {
    console.log("this is page in datacontext:", page)
    const query = getQuery("all", [ page ])
    console.log("this is query:", query)
    getData("database", query).then(results => {
        setData(results)
    })
  }, [page])

  return (
    <DataContext.Provider value={{ data, setData, page, setPage, refreshData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}