import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, deleteExpense, updateExpense } from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

// access "route" props to extract the data passed from navigation.navigate("ManageExpense", {expenseId: id})
// use "navigation" prop to update the options of a Screen
const ManageExpense = ({route, navigation}) => {
  // without ? after params, it will drill into params and if they are undefined, there will be an error. If no params? , it will be just undefined -  safe way into drilling into an object that might be undefined
  const editedExpenseId = route.params?.expenseId
  console.log('editedExpenseId: ', editedExpenseId)
  const isEditing = !!editedExpenseId  // !! - used to convert a value into a boolean

  useLayoutEffect(() => {
    // in order to update options in a component, you need to use useEffect or useLayoutEffect
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    })
  }, [navigation, isEditing])

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const expensesCtx = useContext(ExpensesContext)
  const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editedExpenseId)

  const deleteExpenseHandler = async () => {
    setIsLoading(true)
    try {
      await deleteExpense(editedExpenseId)
      expensesCtx.deleteExpense(editedExpenseId)
      navigation.goBack()
    } catch (e) {
      setError('Could not delete the expense')
      setIsLoading(false)
    }
  }

  const cancelHandler = () => {
    navigation.goBack()
  }

  const confirmHandler = async (expenseData) => {
    setIsLoading(true)
    try {
      if (isEditing) {
        await updateExpense(editedExpenseId, expenseData)
        expensesCtx.updateExpense(editedExpenseId, expenseData)
      } else {
        const id = await storeExpense(expenseData)
        expensesCtx.addExpense({...expenseData, id})
      }
      navigation.goBack() // I do not need to setIsLoading(false) - because we close the screen anyway
    } catch (e) {
      setError('Could not save data')
      setIsLoading(false)
    }
  }

  const errorHandler = () => {
    setError(null)
}

  if (error && !isLoading) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />
}

  if (isLoading) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container} onS>
      <ExpenseForm submitButtonLabel={isEditing ? 'Update' : 'Add'} onCancel={cancelHandler} onSubmit={confirmHandler} defaultValues={selectedExpense}/>
      {isEditing && (<View style={styles.deleteContainer}>
          <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPressAction={deleteExpenseHandler}/>
        </View>
        )}
    </View>
  )
}

export default ManageExpense

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});