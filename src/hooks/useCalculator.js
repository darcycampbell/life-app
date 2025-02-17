const useCalculator = (object) => {
  switch (object) {
    case "calculate gap":
      return (containterWidth) => {
        let idealColumns;
        for (let columns = 10; columns > 0; columns--) {
          const widthOfItems = columns * 200 + (columns - 1) * 15;
          if (widthOfItems <= containterWidth) {
            idealColumns = columns;
            break;
          }
        }
        const leftoverSpace = containterWidth - idealColumns * 200;
        return leftoverSpace / (idealColumns - 1);
      };
    case "calculate percentage":
      return (item) => {
        const type = item.type;
        if (!type) return;
        let percent;
        switch (type) {
          case "habit":
            const avg =
              item.record.reduce((a, b) => a + b, 0) / item.record.length;
            percent = avg / item.target;
            break;
          case "contact":
            const earliestDate = Math.min(...item.record);
            const today = new Date().getTime();
            const difference = (today - earliestDate) / (1000 * 60 * 60 * 24);
            const avgDiff = difference / item.record.length;
            percent = item.target / avgDiff;
            break;
          case "goal":
            const value = item.value / item.totalValue;
            const allocation = item.budget * value;
            percent = allocation / item.target;
            break;
          case "category":
            const power = Math.log(100) / Math.log(item.capacity);
            const tasks = Math.min(Math.pow(item.tasks.length, power), 100);
            percent = (100 - tasks) / 100;
            break;
          default:
            console.log("Something went wrong.");
        }
        percent = Math.min(percent, 1);
        return percent;
      };
    default:
      console.log("Something went wrong");
  }
};

export default useCalculator;
