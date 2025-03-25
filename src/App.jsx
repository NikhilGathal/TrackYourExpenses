import { useState } from 'react'
import './App.css'

import expenseData from './expenseData'
import ExpenseForm from './components/ExpenseForm'
import ExpenseTable from './components/ExpenseTable'
import { useLocalStorage } from './hooks/useLocalStorage'
function App() {

  // below combination of 3 states is because of controlled input as they need state to update their values 
  // instead of 3 diff we have combined it inside of single state 
  const [Expense, setExpense] = useLocalStorage('expense',{
    title: '',
    category: '',
    amount: '',
  })

  // const [expense, setExpenses] = useState(expenseData)
  // const [editingid, seteditingid] = useState('')


  // using localstorage hook (Custom)

  // below state is to update form 
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
