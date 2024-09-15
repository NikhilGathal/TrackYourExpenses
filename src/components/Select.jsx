import React from 'react'

function Select({ id, name, value, error, onChange, label, options, defaultoption }) {
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <select
      
        id={id}
        name={name}
        value={value}
        // value={category}
        onChange={onChange}
        // (e) => setExpense((prev) => ({ ...prev, category: e.target.value }))
        // setcategory(e.target.value)
        // }
        // ref={categoryref}
      >
       
         { defaultoption &&   <option value="" hidden>
           {defaultoption}
          </option> }
       

        {options.map(( category,i) => {
          return <option  key={i} value={category}>{category}</option>
        })}

      
      </select>
      <p className="error">{error}</p>
    </div>
  )
}

export default Select
