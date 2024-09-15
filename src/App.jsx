import { useState } from 'react'
import './App.css'

import expenseData from './expenseData'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import { useLocalStorage } from './hooks/useLocalStorage'
function App() {
  const [Expense, setExpense] = useLocalStorage('expense',{
    title: '',
    category: '',
    amount: '',
  })

  // const [expense, setExpenses] = useState(expenseData)
  // const [editingid, seteditingid] = useState('')


  // using localstorage hook (Custom)

  const [expense, setExpenses] = useLocalStorage('expenses', expenseData)
  const [editingid, seteditingid] = useLocalStorage('editingid','')
  return (
    <>
     <h1  style={ {textAlign:'center'} }>Track Your Expenses</h1>
      <main>
       
        <div className="expense-tracker">
          <ExpenseForm
            setExpenses={setExpenses}
            Expense={Expense}
            setExpense={setExpense}
            editingid={editingid}
            seteditingid={seteditingid}
          />
          <ExpenseTable
            expense={expense}
            setExpenses={setExpenses}
            setExpense={setExpense}
            seteditingid={seteditingid}
          />
        </div>
      </main>
    </>
  )
}

export default App
