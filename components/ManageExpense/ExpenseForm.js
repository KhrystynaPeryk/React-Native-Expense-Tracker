import { StyleSheet, Text, View, Alert } from 'react-native';
import Button from '../UI/Button';
import Input from './Input';
import { useState } from 'react';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

const ExpenseForm = ({submitButtonLabel, onCancel, onSubmit, defaultValues}) => {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '', // amount should be converted to string
            isValid: true
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '', // date obj should be converted into a str YYYY-MM-DD
            isValid: true
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    })
    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        console.log(`inputIdentifier:  ${inputIdentifier}, enteredValue: ${enteredValue}`)
        setInputs((prevState) => {
            return {...prevState, [inputIdentifier]: {value: enteredValue, isValid: true}}
        })
    }

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value, // + is converting str into a num
            date: new Date(inputs.date.value),
            description: inputs.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date' // if you try to create new Date('Hello'), it will return exactly Invalid Date
        const descriptionIsValid = expenseData.description.trim().length > 0

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            //Alert.alert('Invalid input', 'Please check your input values')  ------ you can use a generic Alert, custom approach that updates ui and highlights the invalid inputs is below
            setInputs((curInputs) => {
                return {
                    amount: {value: curInputs.amount.value, isValid: amountIsValid},
                    date: {value: curInputs.date.value, isValid: dateIsValid},
                    description: {value: curInputs.description.value, isValid: descriptionIsValid}
                }
            })
            return  // we return and STOP the function execution
        }

        onSubmit(expenseData)
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid 

    return (
        <View style={styles.formStyle}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input label="Amount" style={styles.rowInput} invalid={!inputs.amount.isValid} textInputConfig={{
                    keyboardType: 'decimal-pad',
                    onChangeText: (enteredValue) => inputChangedHandler('amount', enteredValue),
                    value: inputs.amount.value
                }}/>
                <Input label="Date" style={styles.rowInput} invalid={!inputs.date.isValid} textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: (enteredValue) => inputChangedHandler('date', enteredValue),
                    value: inputs.date.value
                }}/>
            </View>
            <Input label="Description" invalid={!inputs.description.isValid} textInputConfig={{
                multiline: true,
                //autoCorrect: false,
                //autoCapitalize: none
                onChangeText: (enteredValue) => inputChangedHandler('description', enteredValue),
                value: inputs.description.value
            }}/>
            {formIsInvalid && <Text style={styles.errorText}>Invalid input values - please check your entered data.</Text>}
            <View style={styles.buttons}>
                <Button style={styles.button} mode='flat' onPressAction={onCancel}>Cancel</Button>
                <Button style={styles.button} onPressAction={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}

export default ExpenseForm

const styles = StyleSheet.create({
    formStyle: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginVertical: 24
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
    }
});