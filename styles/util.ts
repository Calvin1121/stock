import { StyleSheet } from "react-native";
import { ms } from "react-native-size-matters";
export const commonStyles = StyleSheet.create({
    flex0: {
        flex: 0,
    },
    flex1: {
        flex: 1,
    },
    alignCenter: {
        alignItems: 'center',
    },
    alignStart: {
        alignItems: 'flex-start',
    },
    alignEnd: {
        alignItems: 'flex-end',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    justifyStart: {
        justifyContent: 'flex-start',
    },
    justifyEnd: {
        justifyContent: 'flex-end',
    },
    relative: {
        position: 'relative',
    },
    absolute: {
        position: 'absolute',
    },
    fixed: {
        position: 'fixed',
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexColumn: {
        flexDirection: 'column',
    },
    center: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowStart: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    rowEnd: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    columnCenter: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    rowBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    justifyBetween: {
        justifyContent: 'space-between',
    },
    justifyAround: {
        justifyContent: 'space-around',
    },
    justifyEvenly: {
        justifyContent: 'space-evenly',
    },
    invisible: {
        opacity: 0,
        visibility: 'hidden',
    },
    widthFull: {
        width: '100%',
    },
    heightFull: {
        height: '100%',
    },
    full: {
        width: '100%',
        height: '100%',
    },
    overflowHidden: {
        overflow: 'hidden',
    },
    layoutPadding: {
        paddingHorizontal: ms(30),
        paddingVertical: ms(15),
    }
});