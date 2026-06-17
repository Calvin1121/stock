import { SafeAreaView, ScrollView, TouchableOpacity } from '@/components/ThemeWidget';
import { ThemeType } from '@/constants/Colors';
import { useLanguageStore } from '@/lib/languageStore';
import { useRegisterStore } from '@/lib/registerStore';
import { useTheme } from '@/lib/useTheme';
import { commonStyles } from '@/styles/util';
import { countryCodes } from '@/utils/country-codes';
import { useRouter } from 'expo-router';
import { get } from 'lodash';
import { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ms } from 'react-native-size-matters';

export default function CountryCodee() {
    const router = useRouter();
    const language = useLanguageStore((s) => s.language);
    const setCountryCode = useRegisterStore(s => s.setCountryCode)
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const onSelect = (code: string) => {
        setCountryCode(code)
        router.back()
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={[styles.firstTitleContainer]}>{countryCodes.map((countryCode, c_index) =>
                    <View style={[styles.borderBottom]} key={c_index}>
                        <View style={[styles.borderBottom, !c_index ? styles.firstTitleContainer : styles.titleContainer]}>
                            <Text style={styles.sectionTitle}>{get(countryCode.category, language) || ''}</Text>
                        </View>
                        <View style={[styles.textContainer]}>
                            {countryCode.items?.map(item => <TouchableOpacity onPress={() => onSelect(item.code)} key={`${c_index}_${item.code}`}>
                                <View style={[commonStyles.rowStart, styles.textContainer]}>
                                    <Text style={[styles.sectionText]}>{get(item, language)}</Text>
                                    <Text style={[styles.sectionText]}>{item.code}</Text>
                                </View>
                            </TouchableOpacity>)}
                        </View>
                    </View>)}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        borderBottom: {
            borderBottomWidth: ms(1),
            borderColor: theme.secondary
        },
        titleContainer: {
            paddingVertical: ms(15),
        },
        firstTitleContainer: {
            paddingTop: 0,
            paddingBottom: ms(15)
        },
        sectionTitle: {
            color: theme.primaryText,
            fontSize: ms(18),
            lineHeight: ms(25)
        },
        textContainer: {
            paddingVertical: ms(8),
        },
        sectionText: {
            color: theme.secondaryText,
            fontSize: ms(15),
            lineHeight: ms(21)
        }
    })
}
