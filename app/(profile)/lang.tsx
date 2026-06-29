import IconFont from "@/components/iconfont";
import { SafeAreaView, TouchableOpacity } from "@/components/ThemeWidget";
import { ThemeType } from "@/constants/Colors";
import { resources } from "@/lib/i18n/resources";
import { Language, useLanguageStore } from "@/lib/languageStore";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import { router } from "expo-router";
import { get } from "lodash";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ms } from "react-native-size-matters";

export default function LangPage() {
    const { t, i18n } = useTranslation('lang')
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const langMap = useMemo(() => i18n.getResourceBundle(i18n.language, 'lang'), [i18n])
    const setLanguage = useLanguageStore((s) => s.setLanguage);
    const language = useLanguageStore(s => s.language)
    const onSlectLang = (lang: Language) => {
        setLanguage(lang)
        i18n.changeLanguage(lang);
        router.back()
    }
    return <SafeAreaView>
        <View style={[styles.langs]}>
            {Object.keys(langMap).map((key) => {
                const isValidLang = get(resources, key)
                if (!isValidLang) return null
                return <TouchableOpacity onPress={() => onSlectLang(key as Language)} style={[styles.lang, commonStyles.rowBetween]} key={key}>
                    <Text style={[styles.langText, language === key ? styles.langTextActive : null]}>{t(key)}</Text>
                    {language === key && <IconFont color={theme.primary} name="a-icon-36-danxuan-Singlechoice-Selected" size={ms(20)} />}
                </TouchableOpacity>
            })}
        </View>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        langs: {
            paddingHorizontal: ms(15)
        },
        lang: {
            paddingVertical: ms(15),
            borderBottomWidth: ms(1),
            borderBottomColor: theme.backgroundDivide
        },
        langText: {
            color: theme.primaryText,
            fontSize: ms(15),
            lineHeight: ms(21),
        },
        langTextActive: {
            color: theme.primary,
        }
    })
}