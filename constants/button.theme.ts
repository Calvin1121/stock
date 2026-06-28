
import { dark as darkVar } from "./common.theme";
export const dark = {
    primary: {
        solid: {
            background: darkVar.primary,
            borderColor: darkVar.primary,
            textColor: '#fff',
            spinnerColor: '#fff'
        },
        outline: {
            background: 'transparent',
            borderColor: darkVar.primary,
            textColor: darkVar.primary,
            spinnerColor: darkVar.primary
        },
        ghost: {
            background: 'transparent',
            borderColor: 'transparent',
            textColor: darkVar.primary,
            spinnerColor: darkVar.primary
        },
    },
    secondary: {
        solid: {
            background: '#fff',
            borderColor: '#fff',
            textColor: darkVar.primary,
            spinnerColor: darkVar.primary
        },
        outline: {
            background: 'transparent',
            borderColor: '#fff',
            textColor: darkVar.primary,
            spinnerColor: darkVar.primary
        },
        ghost: {
            background: 'transparent',
            borderColor: 'transparent',
            textColor: darkVar.primary,
            spinnerColor: darkVar.primary
        },
    },
    danger: {
        solid: {
            background: darkVar.error,
            borderColor: darkVar.error,
            textColor: '#fff',
            spinnerColor: '#fff'
        },
        outline: {
            background: 'transparent',
            borderColor: darkVar.error,
            textColor: darkVar.error,
            spinnerColor: darkVar.error
        },
        ghost: {
            background: 'transparent',
            borderColor: 'transparent',
            textColor: darkVar.error,
            spinnerColor: darkVar.error
        },
    },
    success: {
        solid: {
            background: darkVar.success,
            borderColor: darkVar.success,
            textColor: '#fff',
            spinnerColor: '#fff'
        },
        outline: {
            background: 'transparent',
            borderColor: darkVar.success,
            textColor: darkVar.success,
            spinnerColor: darkVar.success
        },
        ghost: {
            background: 'transparent',
            borderColor: 'transparent',
            textColor: darkVar.success,
            spinnerColor: darkVar.success
        },
    },
    info: {
        solid: {
            background: darkVar.info,
            borderColor: darkVar.info,
            textColor: '#fff',
            spinnerColor: '#fff'
        },
        outline: {
            background: 'transparent',
            borderColor: darkVar.info,
            textColor: darkVar.info,
            spinnerColor: darkVar.info
        },
        ghost: {
            background: 'transparent',
            borderColor: 'transparent',
            textColor: darkVar.info,
            spinnerColor: darkVar.info
        },
    }
}

export const light = {
    ...dark
}