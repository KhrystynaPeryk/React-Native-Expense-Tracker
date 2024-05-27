import { StyleSheet, View, Text } from 'react-native';
import ExpensesList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import { GlobalStyles } from '../../constants/styles';

const ExpensesOutput = ({expenses, periodName, fallbackText}) => {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>

    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    } 
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={periodName} />
            {content}
        </View>
    )
    }

export default ExpensesOutput

const styles = StyleSheet.create({
    container: {
        flex: 1, // the container expands to the whole screen
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 16
    }
});