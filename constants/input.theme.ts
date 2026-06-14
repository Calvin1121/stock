import { ms } from "react-native-size-matters";
import { dark as darkVar } from "./common.theme";
export const dark = {
    borderActive: darkVar.primary,
    borderError: darkVar.error,
    placeholder: darkVar.secondary,
    color: '#fff',
    iconColor: '#ffffff5c',
    caretColor: darkVar.primary,
    background: 'transparent',
    borderColor: darkVar.secondary,
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
