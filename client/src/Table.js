import "./Table.scss";

import React, { useState } from "react";

function Table(props) {
  const [name, setName] = useState("");
  const [ID, setID] = useState("");

  // Dynamically render contents of each row
  function renderRows() {
    return props.people.map((person, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td contentEditable spellcheck="false">
            {person.ID}
          </td>
          <td contentEditable spellcheck="false">
            {person.name}
          </td>
          <td contentEditable spellcheck="false">
            {person.caseStatus}
          </td>
          <td contentEditable spellcheck="false">
            {person.lastChecked}
          </td>
          <td></td>
        </tr>
      );
    });
  }

  return (
    <table class="table">
      {/* Labels of each column */}
      <thead class="table__head">
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th>Case Status</th>
          <th>Last Checked</th>
        </tr>
      </thead>

      {/* Contents of each row */}
      <tbody class="table__body">{renderRows()}</tbody>
    </table>
  );
}

export default Table;
