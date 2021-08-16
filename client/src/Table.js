import './Table.scss'

import React, { useState } from 'react'

// Helper functions
import { isValidID } from './utils.js'

function Table({ statuses, onContentChange }) {
  const [cursorPos, setCursorPos] = useState(0)

  const statusRows = statuses.map((status, index) => {
    const key = index + 1

    return (
      // Turn table red if the ID isn't valid
      <tr
        key={key}
        style={{ backgroundColor: isValidID(status.ID) ? '' : '#FF7F7F' }}
      >
        {/* Number each row */}
        <td>{key}</td>

        {/* Editable ID */}
        <td
          suppressContentEditableWarning={true}
          contentEditable={true}
          spellCheck={false}
          onInput={event => {
            setCursorPos(event.target.selectionStart)
            onContentChange(index, { ID: event.currentTarget.textContent })
          }}
          onFocus={event => {
            event.target.selectionStart = cursorPos
          }}
        >
          {status.ID}
        </td>

        {/* Editable name */}
        <td
          suppressContentEditableWarning={true}
          contentEditable={true}
          spellCheck={false}
          onInput={event => {
            setCursorPos(event.target.selectionStart)
            onContentChange(index, { name: event.currentTarget.textContent })
          }}
          onChange={event => {
            event.target.selectionStart = cursorPos
          }}
        >
          {status.name}
        </td>

        {/* Case status and last checked date */}
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
