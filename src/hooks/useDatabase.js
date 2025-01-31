const useDatabase = () => {
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

      const data = await response.json();
      if (!data.success) throw new Error("Upload failed");

      console.log("Upload successful:", data);
    } catch (error) {
      console.error("Upload error:", error);
      console.log(error)
      alert("Upload failed. Please try again.");
    } finally {
      //setLoading(false);
    }
  }
}

export default useDatabase