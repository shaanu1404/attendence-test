import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [apiData, setApiData] = useState([]);

  const employees = ["Virat", "Sourabh", "Vikram", "Sunil"];
  const dates = [
    "2021-02-01",
    "2021-02-02",
    "2021-02-03",
    "2021-02-04",
    "2021-02-05",
    "2021-02-06",
    "2021-02-07",
    "2021-02-08",
    "2021-02-09",
    "2021-02-10",
    "2021-02-11",
    "2021-02-12",
    "2021-02-13",
    "2021-02-14",
    "2021-02-15",
  ];

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://api.skcplindia.in/api-task/");
        const data = await response.json();
        convertData(data);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const convertData = (data) => {
    let list = [];
    for (let emp in data) {
      const empData = data[emp];
      let dataList = [];
      Object.keys(empData).forEach((key) => {
        dataList.push(empData[key]);
      });
      list = [...list, dataList];
    }
    setApiData(list);
  };

  const renderATD = (values) => {
    let vals = values
    return (
      <>
        {dates.map((date) => {
          const r = vals.find(v => v.att_time === date)
          vals = vals.filter(v => v.att_time !== date)
          return r ? <td>P</td>:<td>L</td>
        })}
      </>
    );
  };

  return (
    <div className="App">
      <table cellPadding="8">
        <thead>
          <tr>
            <th>Employee name</th>
            {dates.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {apiData.map((data, index) => {
            return (
              <tr key={index}>
                <td>{employees[index]}</td>
                {renderATD(data)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
