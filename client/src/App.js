// Styles
import './styles.scss'

// Components
import Table from './Table.js'
import Buttons from './Buttons.js'

// Data
import { caseStatuses, defaultStatus } from './data.js'

import React, { useEffect, useState } from 'react'

const previousActions = []
export default function App() {
  const [statuses, _setStatus] = useState(caseStatuses)

  // Use ref so that we can utilize our event listener for undoing
  const statusesRef = React.useRef(statuses)
  const setStatus = data => {
    statusesRef.current = data
    _setStatus(data)
  }

  // Check for user triggering keyboard shortcuts
  function handleKeyPress(event) {
    // Ctrl + Z for undoing changes
    const { key, ctrlKey } = event
    if (!event.repeat && ctrlKey && key === 'z') { undoLastAction() }
  }

  // Undo the last action that the user did
  function undoLastAction() {
    // Nothing to undo, empty stack
    if (previousActions.length === 0) return

    // Get the last action, figure out its type
    const { type, data } = previousActions.pop()
    switch (type) {
      // Remove the added row
      case 'rowAdd':
        handleRemoveRow(true)
        break

      // Add the removed row
      case 'rowRemove':
        handleAddRow(data, true)
        break

      // Should never come here
      default:
        console.error(`Unknown type used for undoing actions. Type: ${type}`)
        break
    }
  }

  // Batch and add changes to the undo stack
  function addChangeToUndos(change) {
    previousActions.push(change)
  }

  // Set up key down event listeners at the start
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])

  // Triggered whenever table entries are edited
  function handleContentChange(id, change) {
    // Make a copy of the statuses array, update changed value
    const newStatuses = [...statuses]
    newStatuses[id] = Object.assign(newStatuses[id], change)

    setStatus(newStatuses)
  }

  // Triggered when adding new row
  function handleAddRow(status, shouldUndo) {
    if (!shouldUndo) addChangeToUndos({ type: 'rowAdd', data: null })

    // If no specific status is provided, then add a default status
    const newStatuses = statusesRef.current.concat(status || defaultStatus)
    setStatus(newStatuses)
  }

  // Triggered when removing a new row
  function handleRemoveRow(shouldUndo) {
    // Add removed status to undo stack
    const lastStatus = statusesRef.current[statusesRef.current.length - 1]
    if (!shouldUndo) addChangeToUndos({ type: 'rowRemove', data: lastStatus })

    const newStatuses = statusesRef.current.slice(statusesRef.current, statusesRef.current.length - 1)
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
