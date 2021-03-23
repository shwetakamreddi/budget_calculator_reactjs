import React, { useState } from 'react'
import "./App.css"
import ExpenseList from "./components/ExpenseList"
import ExpenseForm from "./components/ExpenseForm"
import Alert from "./components/Alert"
import { v4 as uuidv4 } from 'uuid';

const initialExpenses = [
  { id: uuidv4(), charge: "rent", amount: 1600 },
  { id: uuidv4(), charge: "car", amount: 400 },
  { id: uuidv4(), charge: "credit", amount: 1200 }
]
export default function App() {
  const [expenses, setExpenses] = useState(initialExpenses)
  const [charge, setCharge] = useState('')
  const [amount, setAmount] = useState('')
  const [alert, setAlert] = useState({ show: false })

  const handleCharge = (e) => {
    setCharge(e.target.value)
  }
  const handleAmount = (e) => {
    setAmount(e.target.value)
  }

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text })
    setTimeout(() => {
      setAlert({ show: false })
    }, 3000)
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (charge !== '' && amount > 0) {
      let tempExpenses = [...expenses]
      const newExpense = {
        id: uuidv4(),
        charge: charge,
        amount: amount
      }
      tempExpenses = [...tempExpenses, newExpense]
      setExpenses(tempExpenses)
      handleAlert({ type: 'success', text: 'item added' })
      setCharge('')
      setAmount('')
    }
    else {
      handleAlert({ type: 'danger', text: `charge can't be empty value and amount can't be less then zero` })
    }
  }

  const handleEdit = (id) => {
    let tempExpenses=[...expenses]
    const edited=tempExpenses.find((item)=>item.id===id)
    setCharge(edited.charge)
    setAmount(edited.amount)
    tempExpenses=tempExpenses.filter((item)=>item.id!==id)
    setExpenses(tempExpenses)
  }
  const handleDelete = (id) => {
    let tempExpenses=[...expenses]
    tempExpenses=tempExpenses.filter((item)=>item.id!==id)
    setExpenses(tempExpenses)
  }
  const clearItems = () => {
   setExpenses([])
  }
  return (
    <>
      {
        alert.show && <Alert type={alert.type} text={alert.text} />
      }
      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit} />
        <ExpenseList 
        expenses={expenses} 
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        clearItems={clearItems}
        />
      </main>
      <h1>total spending : <span className="total">
        ${expenses.reduce((acc, curr) => {
        return (acc += parseInt(curr.amount))
      }, 0)}
      </span></h1>
    </>
  )
}
