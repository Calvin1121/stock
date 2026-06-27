import { SafeAreaView, ScrollView } from "@/components/ThemeWidget";
import { useMarkdownLink } from "@/components/useCommon";
import { ThemeType } from "@/constants/Colors";
import { useTheme } from "@/lib/useTheme";
import { commonStyles } from "@/styles/util";
import Markdown from 'markdown-to-jsx/native';
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export default function NewsDetailPage() {
    const { theme } = useTheme()
    const styles = useMemo(() => createStyles(theme), [theme])
    const {onLinkPress} = useMarkdownLink()
    const markdown = `# 你好世界
This is a [link](/(auth)/register) with **bold** and *italic* text.
`
    return <SafeAreaView>
        <ScrollView style={commonStyles.mainLayoutPadding}>
            <Markdown
                children={markdown}
                options={{ styles, onLinkPress }}
            />
        </ScrollView>
    </SafeAreaView>
}

function createStyles(theme: ThemeType) {
    return StyleSheet.create({
        heading1: {
            fontSize: 32,
            fontWeight: 'bold',
            color: theme.primaryText
        },
        paragraph: { marginVertical: 8 },
        link: { color: 'blue', textDecorationLine: 'underline' },
    })
}