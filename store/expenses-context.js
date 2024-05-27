import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    setExpenses: (expense) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
})

// for useReducer: state and action will be provided by it
const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [action.payload, ...state]
        case 'SET':
            // we need to reverse the array because in Firebase it stores the latest items on top by default and we want the latest to be in the end
            const inverted = action.payload.reverse()
            return inverted
        case 'UPDATE':
            const filteredExpenses = state.filter((expense) => expense.id !== action.payload.id)
            return [{...action.payload.data, id: action.payload.id}, ...filteredExpenses]
            // const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id)
            // const updatableExpense = state[updatableExpenseIndex]
            // const updatedItem = {...updatableExpense, ...action.payload.data}
            // const updatedExpenses = [...state]
            // updatedExpenses[updatableExpenseIndex] = updatedItem
            // return updatedExpenses
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state
    }
}

const ExpensesContextProvider = ({children}) => {

    // useState could have been used instead, but useReducer is used to manage more complex state
    //second value is mandatory - DUMMY_EXPENSES or empty array as an initial value (inital state)
    const [expensesState, dispatch] = useReducer(expensesReducer, [])

    const addExpense = (expenseData) => {
        dispatch({type: 'ADD', payload: expenseData})
    }

    const setExpenses = (expenses) => {
        dispatch({type: 'SET', payload: expenses})
    }

    const deleteExpense = (id) => {
        dispatch({type: 'DELETE', payload: id})
    }

    const updateExpense = (id, expenseData) => {
        dispatch({type: 'UPDATE', payload: {id: id, data: expenseData}})
    }

    const value = {
        expenses: expensesState,
        setExpenses,
        addExpense,
        deleteExpense,
        updateExpense
    }

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider
