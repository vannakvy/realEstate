

import React, { useState, useEffect } from "react";
import { Bar,Line } from "react-chartjs-2";
import numeral from "numeral";


function LineGraph({ casesType }) {
  // const [data, setData] = useState({});

const datas = {
  labels: ["7/07/21","7/08/21"],
  datasets: [
    {
      label: casesType,
      data: ["3","40"],
      fill: false,
      backgroundColor: "yello",
      borderColor: "red"
    },
  ]
};
  return (
    <div>
        <Line
        data={datas}
        />
    </div>
  );
}

export default LineGraph;