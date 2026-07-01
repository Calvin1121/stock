import IconFont, { IconNames } from "@/components/iconfont";
import { SafeAreaView, ScrollView } from "@/components/ThemeWidget";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function VerificationResultPage() {
    const { t } = useTranslation('profile')
    const [state, setState] = useState<'verifying' | 'failed' | 'success'>('verifying')
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const stateColorMap: Record<string, { icon: string; color: string }> = {
        'verifying': {
            icon: 'pending',
            color: theme.warning
        },
        'failed': {
            icon: 'fail',
            color: theme.error
        },
        'success': {
            icon: 'success',
            color: theme.success
        }
    }
    return <SafeAreaView>
        <ScrollView>
            <View style={[styles.iconContainer, commonStyles.rowCenter]}>
                <IconFont size={ms(100)} name={stateColorMap[state].icon as IconNames} color={stateColorMap[state].color} />
            </View>
            <View style={[commonStyles.rowCenter]}>
                <Text style={[styles.statusText]}>{t(`verifications.result.status.${state}`)}</Text>
            </View>
            <View style={[commonStyles.mainLayoutPadding]}>
                <View style={[styles.infos, commonStyles.flex1]}>
                    <View style={[commonStyles.rowBetween]}>
                        <Text style={[styles.infoText]}>{t('verifications.result.identifyInfo.title')}</Text>
                    </View>
                    <View style={[commonStyles.rowBetween]}>
                        <Text style={[styles.infoLabel]}>{t('verifications.result.identifyInfo.realName')}</Text>
                        <Text style={[styles.infoValue]}>张三</Text>
                    </View>
                    <View style={[commonStyles.rowBetween]}>
                        <Text style={[styles.infoLabel]}>{t('verifications.result.identifyInfo.idNo')}</Text>
                        <Text style={[styles.infoValue]}>123456********0125</Text>
                    </View>
                    <View style={[commonStyles.rowBetween]}>
                        <Text style={[styles.infoLabel]}>{t('verifications.result.identifyInfo.idPic')}</Text>
                        <Text style={[styles.infoValue]}>已上传</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        iconContainer: {
            paddingVertical: ms(50),
        },
        statusText: {
            lineHeight: ms(21),
            fontSize: ms(15),
            color: theme.primaryText,
        },
        infos: {
            marginTop: ms(30),
            gap: ms(10),
            paddingVertical: ms(20),
            paddingHorizontal: ms(15),
            borderRadius: ms(10),
            backgroundColor: theme.card,
            width: '100%',
        },
        infoText: {
            lineHeight: ms(21),
            fontSize: ms(15),
            color: theme.primaryText,
            marginBottom: ms(5),
        },
        infoLabel: {
            lineHeight: ms(17.5),
            fontSize: ms(13),
            color: theme.secondaryText,
        },
        infoValue: {
            lineHeight: ms(17.5),
            fontSize: ms(13),
            color: theme.primaryText,
        }

    })
}