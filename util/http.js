import axios from "axios";

const BACKEND_URL = 'https://expense-tracker-react-na-866ad-default-rtdb.firebaseio.com/'

export async function storeExpense(expenseData) {
    //https://expense-tracker-react-na-866ad-default-rtdb.firebaseio.com/ - from Realtime Database in firebase  .json is required by firebase to understand that we are targetting a specific 'expenses' node
    const response = await axios.post(BACKEND_URL + 'expenses.json',
        expenseData
    )
    // name below will hold the id - you can find info in official docs of firebase realtime database
    const id = response.data.name
    return id
}

export async function fetchExpense() {
    const response = await axios.get(BACKEND_URL + 'expenses.json')
    const expenses = []
    // firebase response returns an array of objects with data so we need to transform it into our data model
    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        }
        expenses.push(expenseObj)
    }

    return expenses
}

export function deleteExpense(id) {
    return axios.delete(BACKEND_URL + `expenses/${id}.json`)
}

export function updateExpense(id, expenseData) {
    return axios.put(BACKEND_URL + `expenses/${id}.json`, expenseData)
}