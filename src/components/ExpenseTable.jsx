import React, { useEffect, useState } from 'react'
import { useFilter } from '../hooks/useFilter'
import ContextMenu from './ContextMenu'
import { useLocalStorage } from '../hooks/useLocalStorage'
// import { useFilter } from '../hooks/useFilter'

function ExpenseTable({ expense, setExpenses, setExpense, seteditingid }) {
  // console.log(expense);

  // without using custom hook for filter

  // const [category , setcategory] = useState('')
  //  const result =  expense.filter(  (exp) => {
  //   return exp.category.toLowerCase().includes(category);
  //  })

  const [result, setquery] = useFilter(expense, (data) => data.category)
  // console.log(result)

  const [menuposition, setmenuposition] = useLocalStorage('menuposition',{})
  const [rowid, setrowid] = useState('')
  const [sortcallback, setsortcallback] = useState(() => () => {})
  // console.log(sortcallback)

  //  console.log(result);

  // let totalAmount = 0
  // result.map(({ amount }) => {
  //   totalAmount = totalAmount + Number(amount)
  // })

  // using reduce
  const totalAmount = result.reduce((acc, curr) => acc + Number(curr.amount), 0)
  // console.log('rendering');

  const [data,getdata] = useLocalStorage('selectedCategory', 'All')
// console.log(data);
  return (
    <>
      <ContextMenu
        position={menuposition}
        setmenuposition={setmenuposition}
        setExpenses={setExpenses}
        rowid={rowid}
        setExpense={setExpense}
        expense={expense}
        seteditingid={seteditingid}
      />
      <table
        className="expense-table"
        onClick={() => {
          if (menuposition.left) setmenuposition({})
        }}
      >
        <thead>
          <tr>
          <th className="amount-column">
              <div>
                <span>Title</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={() => {
                    setsortcallback(() => (a, b) => a.title.localeCompare(b.title))
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() => {
                    setsortcallback(() => (a, b) => b.title.localeCompare(a.title))
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
            
            <th>
              {/* <select onChange={(e) => setcategory(e.target.value.toLowerCase())}> */}
              <select onChange={(e) =>
             {
              getdata(e.target.value)
              setquery(e.target.value.toLowerCase())
             }

              }>
                <option value="">{data}</option>
                <option value="Grocery">Grocery</option>
                <option value="Clothes">Clothes</option>
                <option value="Bills">Bills</option>
                <option value="Education">Education</option>
                <option value="Medicine">Medicine</option>
              </select>
            </th>
            <th className="amount-column">
              <div>
                <span>Amount</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow up-arrow"
                  onClick={() => {
                    setsortcallback(() => (a, b) => a.amount - b.amount)
                  }}
                >
                  <title>Ascending</title>
                  <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  viewBox="0 0 384 512"
                  className="arrow down-arrow"
                  onClick={() => {
                    setsortcallback(() => (a, b) => b.amount - a.amount)
                  }}
                >
                  <title>Descending</title>
                  <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                </svg>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {result.sort(sortcallback).map(({ id, title, category, amount }) => (
            <tr
              key={id}
              onContextMenu={(e) => {
                e.preventDefault()
                setmenuposition({ left: e.clientX + 5, top: e.clientY + 5 })
                setrowid(id)
              }}
            >
              <td>{title}</td>
              <td>{category}</td>
              <td>₹{amount}</td>
            </tr>
          ))}

          {/* {expense.map(({id, title, category, amount}) => (
          <tr key={id}>
            <td>{title}</td>
            <td>{category}</td>
            <td>₹{amount}</td>
          </tr>
        ))} */}

          <tr>
            <th>Total</th>
            <th
              className="clear-sort"
              onClick={() => {
               
                setsortcallback(  ()=> ()=>{} )
               
              }}
            >
              Clear Sort
            </th>
            <th>₹{totalAmount}</th>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default ExpenseTable
