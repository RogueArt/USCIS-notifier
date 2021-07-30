// Styles
import './styles.scss'

// Components
import Table from './Table.js'
import Buttons from './Buttons.js'

// Data
import { caseStatuses, defaultStatus } from './data.js'

import React, { useState } from 'react'

export default function App() {
  const [statuses, setStatus] = useState(caseStatuses)

  // Triggered whenever table entries are edited
  function handleContentChange(id, change) {
    console.log(change)
    // Make a copy of the statuses array, update changed value
    const newStatuses = [...statuses]
    newStatuses[id] = Object.assign(newStatuses[id], change)
    console.log(newStatuses[id])

    setStatus(newStatuses)
  }

  // Triggered when adding new row
  function handleAddRow() {
    const newStatuses = statuses.concat(defaultStatus)
    setStatus(newStatuses)
  }

  // Triggered when removing a new row
  function handleRemoveRow() {
    const newStatuses = statuses.slice(statuses, statuses.length - 1)
    setStatus(newStatuses)
  }

  return (
    <div className="App">
      <h1 className="title" unselectable="on">
        USCIS Case Status Notifier
      </h1>
      <Table statuses={statuses} onContentChange={handleContentChange} />
      <Buttons onAddRow={handleAddRow} onRemoveRow={handleRemoveRow} />
    </div>
  )
}
