import React from 'react';
import { View, StyleSheet, Text, Platform, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize } from '../../constants/colors';
import Button from '../../components/Button';

export default function PdfViewerScreen({ route }) {
  const { t } = useTranslation();
  const { uri } = route.params || {};
  const pdfViewerUrl = uri
    ? `https://drive.google.com/viewerng/viewer?embedded=true&url=${encodeURIComponent(uri)}`
    : null;

  if (!uri) {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.messageText}>No PDF document was provided.</Text>
      </View>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <View style={styles.centeredContainer}>
        <Text style={styles.messageTitle}>{t('common.appName')}</Text>
        <Text style={styles.messageText}>
          Open this PDF directly in your browser.
        </Text>
        <Button
          title="Open PDF"
          onPress={() => Linking.openURL(uri)}
          style={styles.openPdfButton}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: pdfViewerUrl }}
        style={styles.pdf}
        startInLoadingState
        javaScriptEnabled
        domStorageEnabled
        scalesPageToFit
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightGray,
  },
  pdf: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.lightGray,
  },
  messageTitle: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.dark,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  messageText: {
    fontSize: fontSize.base,
    color: colors.gray,
    lineHeight: 22,
    textAlign: 'center',
  },
  openPdfButton: {
    marginTop: spacing.md,
    alignSelf: 'stretch',
  },
});
