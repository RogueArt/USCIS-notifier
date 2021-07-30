function Button({ onAddRow, onRemoveRow }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <button onClick={() => onAddRow()}>Add</button>
      <button onClick={() => onRemoveRow()}>Remove</button>
    </div>
  )
}

export default Button
