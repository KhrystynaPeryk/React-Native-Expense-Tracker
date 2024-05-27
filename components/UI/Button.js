import { Pressable, StyleSheet, Text, View } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

const Button = ({children, onPressAction, mode, style}) => {
    return (
        <View style={style}>
            <Pressable onPress={onPressAction} style={({pressed}) => pressed && styles.pressed}>
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text style={[styles.text, mode === 'flat' && styles.flatText]}>{children}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    button: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 4,
    },
    flat: {
        backgroundColor: 'transparent'
    },
    text: {
        textAlign: 'center',
        color: 'white'
    },
    flatText: {
        color: GlobalStyles.colors.primary200,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.colors.primary100,
        borderRadius: 4
    }
});