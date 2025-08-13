import dataRecordTables from "../content/dataRecordTables";
import dataTables from "../content/dataTables";
import tableQueries from "../content/tableQueries";

export function queryAll(data) {
  const [page = undefined] = data;
  if (data.length === 0) {
    alert("invalid data");
    return;
  }
  const query = tableQueries[page];
  return query;
}

export function getDeleteItemQuery(data) {
  const [page = undefined, item = undefined] = data;
  if (data.length === 0) {
    alert("invalid data");
    return;
  }
  const query = `DELETE FROM ${dataRecordTables[page]} WHERE ${
    dataTables[page].slice(0, -1) + "_id"
  } = ${item}; DELETE FROM ${dataTables[page]} WHERE id = ${item};`;
  return query;
}

export function getSelectItemQuery(data) {
  const [page = undefined, item = undefined] = data;
  if (data.length === 0) {
    alert("invalid data");
    return;
  }
  const query = `SELECT * FROM ${dataTables[page]} WHERE id = ${item};`;
  return query;
}

export function editItemQuery(data) {
  const [page = undefined, item = undefined, values = undefined] = data;
  if (data.length === 0) {
    alert("invalid data");
    return;
  }
  const query = `UPDATE ${dataTables[page]} 
    SET title = ${values[0]}, image = ${values[0]}, target = ${values[0]}
    WHERE id = ${item};`;
  return query;
}
