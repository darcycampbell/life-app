import { createContext, useContext, useCallback, useReducer } from "react";
import { queryDatabase } from "../utils/dataUtils";
import { queryAll } from "../utils/queryUtils";

const DataContext = createContext();
const initialState = {
    data: [],
    loading: false,
    error: null,
    page: null,
    update: true,
  }

function dataReducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload, error: null };
    case "SET_DATA":
      return { ...state, data: action.payload, loading: false, error: null };
    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_UPDATE":
      return { ...state, update: action.payload };
    case "APPEND_DATA":
      return {
        ...state,
        data: [...state.data, ...action.payload],
        loading: false,
        error: null,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const refreshData = useCallback(async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const query = queryAll([state.page]);
      const results = await queryDatabase(query);
      dispatch({ type: "SET_DATA", payload: results });
      return results;
    } catch (error) {
      console.error("Failed to refresh data:", error);
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  }, [state.page, queryDatabase, queryAll]);

  const setPage = useCallback((newPage) => {
    dispatch({ type: "SET_PAGE", payload: newPage });
  }, []);

  const setUpdate = useCallback((newState) => {
    dispatch({ type: "SET_UPDATE", payload: newState });
  }, []);

  const contextValue = {
    data: state.data,
    loading: state.loading,
    error: state.error,
    page: state.page,
    update: state.update,
    refreshData,
    setPage,
    setUpdate,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);

  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }

  return context;
}

/* import { createContext, useState, useContext, useCallback } from 'react';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState()
  
/*   const updateData = (newData) => {
    setData([...data, newData]);
  }; 
  
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
} */
