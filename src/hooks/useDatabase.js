import tableQueries from "../content/tableQueries";
import dataTables from "../content/dataTables";

const useDatabase = (object) => {
  switch (object) {
    case "post":
      return async (formValues, category) => {
        const newData = new FormData();
        console.log(formValues);
        newData.append("title", formValues.name);
        newData.append("image", formValues.image);
        newData.append("target", formValues.target);
        newData.append("category", category);

        try {
          //setLoading(true);

          //I guess this needs a response to check if the upload was successful
          const response = await fetch("http://localhost:3001/upload", {
            method: "POST",
            body: newData,
          });

          if (!response.ok) {
            throw new Error(`Upload failed with status: ${response.status}`);
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Upload error:", error);
          console.log(error);
          alert("Upload failed. Please try again.");
        } finally {
          //setLoading(false);
        }
      };
    case "fetch":
      return async (item, page) => {
        let query;
        let responseJSON;
        
        if (item) {
          query = `SELECT * FROM ${dataTables[page]} WHERE id = ${item};`
        } else {
          query = tableQueries[page]
        }
        
        try {
          const response = await fetch("http://localhost:3001/database", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query: query }),
          });
          if (!response.ok) {
            throw new Error("Database connection failed");
          }
          responseJSON = await response.json();
          return responseJSON;
        } catch (err) {
          console.error("Error fetching data:", err);
          // You might want to return something to indicate an error occurred
          return { error: err.message };
        }
      };
    default:
      console.log("Something went wrong with useDatabase");
  }
};

export default useDatabase;
