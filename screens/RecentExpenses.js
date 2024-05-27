import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext, useEffect, useState } from 'react';
import { getDateMinusDays } from '../util/date';
import { fetchExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

const RecentExpenses = () => {
    const [isFetching, setIsFetching] = useState(true)
    const [error, setError] = useState()
    const expensesCtx = useContext(ExpensesContext)

    // async useEffect function is discouraged by react team
    useEffect( () => {
        async function getExpenses() {
            setIsFetching(true)
            try {
                const expenses = await fetchExpense()
                expensesCtx.setExpenses(expenses)
            } catch(e) {
                setError('Could not fetch expenses')
            }
            setIsFetching(false)
        }
        getExpenses() 
        // for this approach, if ew add a new expense it will be only shown when we reload the app. Workaround - use the context too
    }, [])

    const errorHandler = () => {
        setError(null)
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler} />
    }

    if (isFetching) {
        return <LoadingOverlay />
    }

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date()
        const date7DaysAgo = getDateMinusDays(today, 7)
        return (expense.date >= date7DaysAgo) && (expense.date <= today)
    })
    return (
        <ExpensesOutput expenses={recentExpenses} periodName="Last 7 Days" fallbackText="No expenses registered for the last 7 days." />
    )
}

export default RecentExpenses