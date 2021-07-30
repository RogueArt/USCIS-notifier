import './Buttons.scss'

function Button({ onAddRow, onRemoveRow }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <button className="row-button" onClick={() => onAddRow()}>
        Add
      </button>
      <button className="row-button" onClick={() => onRemoveRow()}>
        Remove
      </button>
    </div>
  )
}

export default Button
