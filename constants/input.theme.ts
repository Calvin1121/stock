import { ms } from "react-native-size-matters";

export const baseInputTheme = {
    borderActive: '#4D8EFF',
    borderError: '#FF4D4F',
    placeholder: '#6D7278',
    color: '#fff',
    iconColor: '#ffffff5c',
    caretColor: '#4D8EFF',
    background: 'transparent',
    borderColor: '#6D7278',
};

export const dark = {
    ...baseInputTheme,
    rounded: {
        borderRadius: ms(22),
        borderWidth: ms(1),
        borderBottomWidth: ms(1),
    },
    underline: {
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: ms(1),
    },
    outline: {
        borderRadius: ms(8),
        borderWidth: ms(1),
        borderBottomWidth: ms(1),
    },
};

export const light = {
    ...dark,
};
