import React, { useEffect, useRef, useState } from 'react'
import Input from './Input'
import Select from './Select'

function ExpenseForm({
  setExpenses,
  Expense,
  setExpense,
  editingid,
  seteditingid,
}) {
  // const [title, settitle] = useState('')
  // const [category, setcategory] = useState('')
  // const [amount, setamount] = useState('')

  const [errors, seterrors] = useState({})
  const errordata = {}
  // console.log(Expense);

  const validationconfig = {
    title: [
      { require: true, message: 'Please Enter Title ' },
      {
        minlength: 2,
        message: 'Title should be atleast 2 char long ',
      },
    ],
    category: [{ require: true, message: 'Please Enter Category' }],
    amount: [
      { require: true, message: 'Please Enter Amount' },
      { pattern: /^(0|[1-9]\d*)(\.\d+)?$/, message: 'Please Enter a valid Number' },
    ],
    // email: [
    //   {
    //     pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    //     message: 'Please Enter a valid Email',
    //   },
    // ],
  }

  const validate = (formData) => {
    Object.entries(formData).forEach(([key, value]) => {
      validationconfig[key].forEach((rule) => {
        if (rule.require && !value) {
          errordata[key] = rule.message
        }
        if (rule.minlength && value !== '' && value.length < rule.minlength) {
          errordata[key] = rule.message
        }

        if (rule.pattern && !rule.pattern.test(value)) {
          errordata[key] = rule.message
        }
      })
    })

    // if (!formData.title) {
    //   errordata.title = 'Please Enter Title  '
    // }

    // if (!formData.category) {
    //   errordata.category = 'Please Enter Category '
    // }

    // if (!formData.amount) {
    //   errordata.amount = 'Please Enter Amount'
    // }
    seterrors(errordata)
    return errordata
  }

  // console.log(expense)

  // const myref = useRef()

  // using useref() hook
  // const titleref = useRef()
  // const categoryref = useRef()
  // const amountref = useRef()

  // useEffect( ()=>
  // {
  //   console.log(titleref.current.value)
  // } )

  //  console.log(Expense.title);

  // just for checking

  // console.log('rendering');

  // console.log(title);

  const handlesubmit = (e) => {
    e.preventDefault()
    // const Expense = { ...getformdata(e.target), id: crypto.randomUUID() }
    // setExpenses((prev) => [...prev, Expense])

    // only 1 usestate is used for all 3 title category amount

    // console.log(Expense)

    const validres = validate(Expense)
    // console.log(validres);
    if (Object.keys(validres).length !== 0) return

    // console.log(erros);

    if (editingid) {
      setExpenses((prev) =>
        prev.map((prevexp) => {
          if (prevexp.id === editingid) {
            return { ...Expense, id: editingid }
          }
          return prevexp
        })
      )


      setExpense({
        title: '',
        category: '',
        amount: '',
        // email: '',
      })


      seteditingid('')
      return
    }

    setExpenses((prev) => [...prev, { ...Expense, id: crypto.randomUUID() }])

    setExpense({
      title: '',
      category: '',
      amount: '',
      // email: '',
    })

    // code for useref

    // console.log(  {
    //   title : titleref.current.value ,
    //   category : categoryref.current.value,
    //   amount : amountref.current.value
    // } );

    // setExpenses((prev) => [...prev, {
    //   title : titleref.current.value ,
    //   category : categoryref.current.value,
    //   amount : amountref.current.value,id: crypto.randomUUID()
    // }])
    // titleref.current.value  = ''
    //    categoryref.current.value = ''
    //    amountref.current.value = ''

    // const Expense = { title, category, amount, id: crypto.randomUUID() }
    // setExpenses((prev) => [...prev, Expense])
    // e.target.reset() will not work therefore use below code
    // settitle('')
    // setcategory('')
    // setamount('')
  }

  const handlechange = (e) => {
    // const name = e.target.name
    // const value = e.target.value
    // OR
    const { name, value } = e.target
    // console.log(name ,value);
    setExpense((prev) => ({ ...prev, [name]: value }))
    seterrors({})
  }

  // const getformdata = (form) => {
  //   const data = {}
  //   const formData = new FormData(form)
  //   for (const [key, value] of formData.entries()) {
  //     data[key] = value
  //   }
  //   return data
  // }

  return (
    <form className="Expense-form" onSubmit={handlesubmit}>
      <Input
        label="Title"
        id="title"
        name="title"
        value={Expense.title}
        onChange={handlechange}
        error={errors.title}
      />

      <Select
        label="Category"
        id="category"
        name="category"
        value={Expense.category}
        onChange={handlechange}
        error={errors.category}
        options={['Grocery', 'Clothes', 'Education', 'Medicine', 'Bills']}
        defaultoption="select category"
      />

      <Input
        label="Amount"
        id="amount"
        name="amount"
        value={Expense.amount}
        onChange={handlechange}
        error={errors.amount}
      />

      {/* <Input
        label="Email"
        id="email"
        name="email"
        value={Expense.email}
        onChange={handlechange}
        error={errors.email}
      /> */}

      <button className="add-btn">{editingid ? 'save' : 'Add'}</button>
    </form>
  )
}

export default ExpenseForm
