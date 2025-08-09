import dataRecordTables from "../content/dataRecordTables";
import dataTables from "../content/dataTables";
import tableQueries from "../content/tableQueries";
import { useCallback } from "react";

const useQuery = () => {
  return useCallback((command, data) => {
    let query;
    const [page = undefined, item = undefined] = data;

    if (data.length === 0) {
      alert("invalid data");
      return;
    }

    switch (command) {
      case "all":
        query = tableQueries[page];
        break;
      case "item":
        query = `SELECT * FROM ${dataTables[page]} WHERE id = ${item};`;
        break;
      case "delete_item":
        query = `DELETE FROM ${dataRecordTables[page]} WHERE ${
          dataTables[page].slice(0, -1) + "_id"
        } = ${item}; 
              DELETE FROM ${dataTables[page]} WHERE id = ${item};`;
        break;
      default:
        alert("invalid commmand");
        return;
    }

    return query;
  }, [])
};

export default useQuery;
