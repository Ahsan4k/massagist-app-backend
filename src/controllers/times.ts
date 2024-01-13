export const showTimes = () => {
    let result :string= "";
    const times: number = parseInt(process.env.TIMES || "5");
    for (let i = 0; i < times; i++) {
      result += i + "";
    }
    return result;
  };