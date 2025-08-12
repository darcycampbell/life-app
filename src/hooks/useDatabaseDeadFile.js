// services/api.js



/* import { useCallback } from "react";

function () {
  console.log("use database running at", new Date().toISOString())
  return useCallback(async (command, data) => {
    console.log("get data runnning at", new Date().toISOString())
    let URL;
    let object;

    if (command === "upload") {
      URL = "http://localhost:3001/upload";
      object = {
        method: "POST",
        body: data,
      };
    } else if (command === "database") {
      URL = "http://localhost:3001/database";
      object = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: data }),
      };
    } else {
      alert("invalid command: ", command);
      return;
    }

    try {
      const response = await fetch(URL, object);
      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }
      const responseJSON = await response.json();
      return responseJSON;
    } catch (error) {
      console.error("Upload error:", error);
      console.log(error);
      alert("Upload failed. Please try again.");
    }
  }, [])
};

export default ; */
