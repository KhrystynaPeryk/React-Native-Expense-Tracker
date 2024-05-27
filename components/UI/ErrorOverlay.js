import { Text, StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';
import Button from './Button';

const ErrorOverlay = ({message, onConfirm}) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An error occurred!</Text>
            <Text style={[styles.text, styles.message]}>{message}</Text>
            <Button onPressAction={onConfirm}>Okay</Button>
        </View>
    )
}

export default ErrorOverlay

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text: {
        color: 'white',
        textAlign: 'center',
        margin: 8
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    message: {
        fontSize: 14
    }
});