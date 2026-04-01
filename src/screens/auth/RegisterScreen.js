import React, { useContext, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors, spacing, fontSize } from '../../constants/colors';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Alert from '../../components/Alert';
import { UserContext } from '../../context/UserContext';
import { authApi } from '../../services/apiService';
import { saveUser } from '../../services/storageService';
import { isValidEmail, isValidPassword, validateForm } from '../../utils/validation';

export default function RegisterScreen({ navigation }) {
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [errors, setErrors] = useState({});

  const validateRegisterForm = () => {
    const rules = {
      name: {
        required: true,
        minLength: 2,
      },
      email: {
        required: true,
        custom: (value) => {
          if (!isValidEmail(value)) return 'Please enter a valid email';
        },
      },
      password: {
        required: true,
        custom: (value) => {
          if (!isValidPassword(value)) {
            return 'Password must be at least 6 characters with uppercase and number';
          }
        },
      },
      confirmPassword: {
        required: true,
        custom: (value) => {
          if (value !== password) return 'Passwords do not match';
        },
      },
    };

    const validation = validateForm({ name, email, password, confirmPassword }, rules);
    setErrors(validation.errors);

    if (!agreedToTerms) {
      setAlert({
        type: 'error',
        title: 'Required',
        message: 'You must agree to terms and conditions',
      });
      return false;
    }

    return validation.isValid;
  };

  const handleRegister = async () => {
    if (!validateRegisterForm()) {
      return;
    }

    setLoading(true);
    try {
      const response = await authApi.register(email, password, name);
      const user = response.data.user;

      await saveUser(user);
      setUser(user);

      setAlert({
        type: 'success',
        title: 'Account Created',
        message: `Welcome, ${user.name}!`,
      });
    } catch (error) {
      setAlert({
        type: 'error',
        title: 'Registration Failed',
        message: error.message || 'Failed to create account',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join our safe community</Text>
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
          label="Full Name"
          placeholder="Enter your full name"
          value={name}
          onChangeText={setName}
          error={errors.name}
          icon="account-outline"
        />

        <Input
          label="Email Address"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          error={errors.email}
          keyboardType="email-address"
          icon="email-outline"
        />

        <Input
          label="Password"
          placeholder="At least 6 characters with uppercase & number"
          value={password}
          onChangeText={setPassword}
          error={errors.password}
          secureTextEntry
          icon="lock-outline"
        />

        <Input
          label="Confirm Password"
          placeholder="Re-enter password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          error={errors.confirmPassword}
          secureTextEntry
          icon="lock-check-outline"
        />

        {/* Terms Agreement */}
        <TouchableOpacity
          style={styles.termsContainer}
          onPress={() => setAgreedToTerms(!agreedToTerms)}
        >
          <View style={[
            styles.checkbox,
            agreedToTerms && styles.checkboxChecked,
          ]}>
            {agreedToTerms && (
              <MaterialCommunityIcons
                name="check"
                size={16}
                color={colors.primary}
              />
            )}
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        <Button
          title="Create Account"
          onPress={handleRegister}
          loading={loading}
          disabled={loading}
          style={styles.registerButton}
        />
      </View>

      {/* Login Link */}
      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Info */}
      <View style={styles.infoSection}>
        <MaterialCommunityIcons
          name="lock-outline"
          size={20}
          color={colors.success}
        />
        <Text style={styles.infoText}>
          Your data is encrypted and secured. We never share your information.
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  backButton: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: fontSize['3xl'],
    fontWeight: 'bold',
    color: colors.dark,
  },
  subtitle: {
    fontSize: fontSize.base,
    color: colors.gray,
    marginTop: spacing.xs,
  },
  alert: {
    marginHorizontal: spacing.md,
  },
  formContainer: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.mediumGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  termsText: {
    flex: 1,
    fontSize: fontSize.sm,
    color: colors.dark,
    lineHeight: 18,
  },
  termsLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  registerButton: {
    marginTop: spacing.md,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  loginText: {
    color: colors.gray,
    fontSize: fontSize.base,
  },
  loginLink: {
    color: colors.primary,
    fontSize: fontSize.base,
    fontWeight: '600',
  },
  infoSection: {
    flexDirection: 'row',
    marginHorizontal: spacing.md,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: fontSize.sm,
    color: colors.success,
    lineHeight: 18,
  },
});
