import './Table.scss'

import React, { useEffect, useRef, useState } from 'react'

// Helper functions
import { isValidID } from './utils.js'

function Table({ statuses, onContentChange }) {
  // Generate all the rows of the table beforehand
  const statusRows = statuses.map((status, index) => {
    const key = index + 1
    return (
      // Turn table red if the ID isn't valid
      <tr
        key={key}
        style={{
          backgroundColor: isValidID(status.ID) ? '#FAFAFA' : '#FF7F7F',
        }}
      >
        {/* Number each row */}
        <td>{key}</td>

        {/* Editable ID */}
        <td
          suppressContentEditableWarning={true}
          contentEditable={true}
          spellCheck={false}
          value={status.ID}
          onInput={e => {
            onContentChange(index, { ID: e.target.innerText })
          }}
        >
          {status.ID}
        </td>

        {/* Editable name */}
        <td
          suppressContentEditableWarning={true}
          contentEditable={true}
          spellCheck={false}
          value={status.name}
          onInput={e => onContentChange(index, { name: e.target.innerText })}
        >
          {status.name}
        </td>

        {/* Case status and last checked date */}
        <td>{status.caseStatus}</td>
        <td>{status.lastChecked}</td>
      </tr>
    )
  })

  // Now we render the entire table
  return (
    <table className="table">
      {/* Labels of each column */}
      <thead className="table__head">
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Name</th>
          <th>Case Status</th>
          <th>Last Checked</th>
        </tr>
      </thead>

      {/* Contents of each row */}
      <tbody className="table__body">{statusRows}</tbody>
    </table>
  )
}

export default Table
