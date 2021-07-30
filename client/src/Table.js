import './Table.scss'

import React from 'react'

// Get stored data
// import { data } from './data.js'

function Table({ statuses, onContentChange }) {
  const statusRows = statuses.map((status, index) => {
    const key = index + 1
    return (
      <tr key={key}>
        <td>{key}</td>
        <td
          contentEditable={true}
          spellCheck={false}
          onInput={(event) => {
            onContentChange(index, { ID: event.currentTarget.textContent })
          }}
        >
          {status.ID}
        </td>
        <td
          contentEditable={true}
          spellCheck={false}
          onInput={(event) => {
            onContentChange(index, { name: event.currentTarget.textContent })
          }}
        >
          {status.name}
        </td>
        <td>{status.caseStatus}</td>
        <td>{status.lastChecked}</td>
      </tr>
    )
  })

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
