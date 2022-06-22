import { useState } from 'react'
import './formInput.css'

const FormInput = ({ label, handleChange, errorMessage, id, ...inputProps }) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => {
    setFocused(true);
  }
  return (
    <div className="formInput">
      <label htmlFor={inputProps.placeholder}>{label}</label>
      <input id={inputProps.placeholder}
        {...inputProps}
        onChange={handleChange}
        onBlur={handleFocus}
        onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)}
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  )
}

export default FormInput