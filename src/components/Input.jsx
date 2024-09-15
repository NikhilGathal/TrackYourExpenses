import React from 'react'

function Input(   {   id , name , value,error,onChange,label }  ) {
  return (
    <div className="input-container">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={name}
      value={value}
      // value={title}
      onChange={onChange}
      // (e) => setExpense((prev) => ({ ...prev, title: e.target.value }))
      // settitle(e.target.value)
      // }
      // ref={titleref}
    />
    <p className="error">{error}</p>
    {/* {erros.title && <p className='error'>{erros.title}</p>} */}
    {/* {errordata.title !== ''  ? <p>{errordata.title}</p> : ''}         */}
  </div>
  )
}

export default Input