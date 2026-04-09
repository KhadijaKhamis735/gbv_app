import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { colors, spacing, fontSize, shadows } from '../../constants/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { UserContext } from '../../context/UserContext';
import { authApi } from '../../services/apiService';
import { saveUser } from '../../services/storageService';
import { isValidEmail, validateForm } from '../../utils/validation';

export default function LoginScreen({ navigation }) {
  const { t } = useTranslation();
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});

  const validateLoginForm = () => {
    const rules = {
      email: {
        required: true,
        custom: (value) => {
          if (!isValidEmail(value)) return 'Please enter a valid email';
        },
      },
      password: {
        required: true,
        minLength: 6,
      },
    };

    const validation = validateForm({ email, password }, rules);
    setErrors(validation.errors);
    return validation.isValid;
  };

  const handleLogin = async () => {
    if (!validateLoginForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.login(email, password);
      const user = response.data.user;

      await saveUser(user);
      setUser(user);

      setAlert({
        type: 'success',
        title: t('auth.loginSuccess'),
        message: t('auth.welcomeBack', { name: user.name }),
      });
    } catch (error) {
      setAlert({
        type: 'error',
        title: t('auth.loginFailed'),
        message: error.message || t('auth.invalidCredentials'),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousLogin = async () => {
    setLoading(true);
    try {
      const anonymousUser = {
        id: Date.now().toString(),
        name: 'Anonymous User',
        email: null,
        phone: null,
        isAnonymous: true,
        createdAt: new Date(),
      };

      await saveUser(anonymousUser);
      setUser(anonymousUser);

      setAlert({
        type: 'success',
        title: t('auth.anonWelcomeTitle'),
        message: t('auth.anonWelcomeMessage'),
      });
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Error',
        message: t('auth.anonFailed'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <MaterialCommunityIcons
          name="shield-heart-outline"
          size={60}
          color={colors.primary}
        />
        <Text style={styles.title}>ZYGA</Text>
        <Text style={styles.subtitle}>{t('auth.subtitle')}</Text>
      </View>

      {/* Alert */}
      {alert && (
        <Alert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
          style={styles.alert}
        />
      )}

      {/* Form */}
      <View style={styles.formContainer}>
        <Input
          label={t('auth.email')}
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          icon="email-outline"
        />

        <Input
          label={t('auth.password')}
          placeholder={t('auth.password')}
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry
          icon="lock-outline"
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>{t('auth.forgotPassword')}</Text>
        </TouchableOpacity>

        <Button
          title={t('auth.login')}
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          style={styles.loginButton}
        />
      </View>

      {/* Divider */}
      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>{t('auth.or')}</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* Anonymous Login */}
      <Button
        title={t('auth.continueAnonymous')}
        onPress={handleAnonymousLogin}
        variant="outline"
        loading={loading}
        disabled={loading}
        style={styles.anonymousButton}
      />

      {/* Sign Up Link */}
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>{t('auth.dontHaveAccount')} </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.signupLink}>{t('auth.signUp')}</Text>
        </TouchableOpacity>
      </View>

      {/* Help Text */}
      <View style={styles.helpSection}>
        <MaterialCommunityIcons
          name="information-outline"
          size={20}
          color={colors.info}
        />
        <Text style={styles.helpText}>
          {t('auth.helpText')}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingTop: spacing.xxl,
  },
  title: {
    fontSize: fontSize['4xl'],
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: spacing.md,
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  alert: {
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  formContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xl,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.md,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '500',
  },
  loginButton: {
    marginTop: spacing.md,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.mediumGray,
  },
  dividerText: {
    marginHorizontal: spacing.md,
    color: colors.gray,
    fontSize: fontSize.sm,
  },
  anonymousButton: {
    marginHorizontal: spacing.md,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
  },
  signupText: {
    color: colors.gray,
    fontSize: fontSize.base,
  },
  signupLink: {
    color: colors.primary,
    fontSize: fontSize.base,
    fontWeight: '600',
  },
  helpSection: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
  },
  helpText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: fontSize.sm,
    color: colors.info,
    lineHeight: 20,
  },
});
