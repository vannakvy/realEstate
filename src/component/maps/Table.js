import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table() {
  return (
    <div className="covid_tables">
    
        <tr className="tr">
          <td className="td">ggg</td>
          <td className="td">
            <strong>{numeral(32934).format("0,0")}</strong>
          </td>
        </tr>
      
    </div>
  );
}

export default Table;
