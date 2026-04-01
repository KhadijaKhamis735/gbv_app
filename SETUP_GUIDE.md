# GBV Reporting App - Setup & Installation Guide

## 🎯 Quick Start (5 minutes)

### Step 1: Install Node & Expo
```bash
# Install Node.js from https://nodejs.org/ (LTS version)
# Then install Expo CLI globally
npm install -g expo-cli
```

### Step 2: Install Dependencies
```bash
cd "GBV report system"
npm install
```

### Step 3: Start the App
```bash
npm start
# or
expo start
```

### Step 4: Open on Your Device

**Option A: Expo Go App**
- Download Expo Go from App Store or Google Play
- Scan the QR code displayed in terminal
- App loads automatically

**Option B: iOS Simulator (Mac only)**
```bash
npm start
# Press 'i' when prompted
```

**Option C: Android Emulator**
```bash
npm start
# Press 'a' when prompted
# (Android Studio must be installed and emulator running)
```

## 📋 Prerequisites

### Required
- **Node.js** v14+ (https://nodejs.org/)
- **npm** or **yarn** package manager
- **Expo CLI** (`npm install -g expo-cli`)

### For iOS Development (Mac)
- **Xcode** (from App Store)
- **iOS Simulator** (included with Xcode)

### For Android Development
- **Android Studio** (https://developer.android.com/studio)
- **Android Emulator** or physical Android device

### Optional
- **VS Code** (for code editing)
- **Git** (for version control)

## 🔧 Full Installation Steps

### 1. Clone/Extract Project
```bash
# If using Git
git clone <repository-url>
cd "GBV report system"

# Or just extract the folder and navigate to it
cd "GBV report system"
```

### 2. Install Node Modules
```bash
npm install
# This downloads all dependencies listed in package.json
# Takes 2-3 minutes on first install
```

### 3. Verify Installation
```bash
npm list
# Shows all installed packages
# Verify no major errors
```

### 4. Start Development Server
```bash
expo start
```

## 🚀 Running the App

### Via Expo Go (Easiest)
1. **Start server**: `expo start`
2. **On your phone**: Download Expo Go app
3. **Scan QR code** from terminal
4. **Enjoy!** App loads in seconds

### Via iOS Simulator
```bash
expo start
# Press 'i'
# Simulator opens automatically (Mac only)
```

### Via Android Emulator
```bash
# 1. Open Android Studio
# 2. Open Device Manager > Create/Launch Emulator
# 3. Run in terminal:
expo start
# Press 'a'
```

### Via Physical Phone
1. **Install Expo Go** from app store
2. **Connect to same WiFi** as computer
3. **Scan QR code** from `expo start` output
4. **App loads** over network

## 📱 Test Accounts

### Login Credentials
- **Email**: test@example.com
- **Password**: Test1234 (or any password, mock auth accepts all)

### Or Use Anonymous Mode
- Just tap "Continue as Anonymous" button
- No login required
- Full app access

## 🎨 Testing Different Screens

### Main Dashboard
- Home tab → All quick actions
- Tap "Report Now" for incident form

### Authentication
- Tap "Logout" in Profile
- Try Register or Login again
- Test Anonymous mode

### Features to Test
1. **Report Incident**: Multi-step form, media upload
2. **Chat Support**: Real-time bot responses
3. **Services Directory**: Filter by category, call functions
4. **Stories**: Add and view community stories
5. **Emergency**: One-tap calling
6. **Feedback**: Submit rating and message

## 🔎 Common Issues & Fixes

### Issue: `expo: command not found`
```bash
# Install globally
npm install -g expo-cli

# Verify
expo --version
```

### Issue: `npm install` fails
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 19000 already in use
```bash
# Use different port
expo start --port 19001

# Or kill process using port 19000
# On Mac/Linux: lsof -i :19000 | kill -9 <PID>
# On Windows: netstat -ano | findstr :19000
```

### Issue: Simulator not starting
```bash
# Verify installation
xcode-select --install

# For Android, start emulator first from Android Studio
# Then run expo start
```

### Issue: Can't scan QR code
- Ensure phone and computer on same WiFi
- Use USB tunnel: `expo start --tunnel`
- Try local mode: `expo start --localhost`

### Issue: App crashes on launch
```bash
# Clear cache
expo start -c

# Reinstall dependencies
npm install

# Check console for errors
```

## 📝 Project Structure Overview

```
/src
├── components/        # Reusable UI elements
├── screens/          # App screens
├── navigation/       # Navigation setup
├── services/         # API & Storage
├── context/          # State management
├── data/             # Mock data
├── constants/        # Colors, spacing
└── utils/            # Helper functions

App.js               # Entry point
app.json             # Expo config
package.json         # Dependencies
```

## 🛠️ Development Workflow

### Making Changes
1. Edit files in `/src`
2. Save file
3. **Hot reload** happens automatically (with Expo)
4. See changes immediately on phone/simulator

### Adding Dependencies
```bash
# Add new package
npm install package-name

# Restart app
expo start -c
```

### Debugging
- **Console logs**: Check terminal output
- **React DevTools**: `Ctrl+M` (Android) or `Cmd+D` (iOS)
- **Network requests**: Check apiService.js responses

## 📦 Deployment

### Testing on Physical Device

**iPhone:**
1. With Expo Go: Just scan QR code
2. For TestFlight: `eas build --platform ios`

**Android:**
1. With Expo Go: Just scan QR code
2. For Google Play: `eas build --platform android`

### Build for Distribution
```bash
# Setup EAS
npm install -g eas-cli
eas login

# Build iOS
eas build --platform ios

# Build Android
eas build --platform android
```

## 🎓 Learning Resources

- **React Native**: https://reactnative.dev/
- **Expo**: https://docs.expo.dev/
- **React Navigation**: https://reactnavigation.org/
- **AsyncStorage**: https://react-native-async-storage.github.io/

## ✅ Checklist Before Going Live

- [ ] All screens tested
- [ ] Forms validated
- [ ] API endpoints configured
- [ ] Permissions granted (camera, location)
- [ ] Error handling implemented
- [ ] Offline mode tested
- [ ] Performance optimized
- [ ] Security checked
- [ ] Privacy policy added
- [ ] Terms & conditions finalized

## 📱 Simulator Shortcuts

### iOS
- `Cmd + D` → Developer menu
- `Cmd + R` → Reload
- `Cmd + M` → Toggle menu
- Shake device → DevTools

### Android
- `Ctrl + M` → Developer menu
- `Ctrl + R` → Reload
- Shake device → DevTools

## 🆘 Getting Help

### Check Logs
```bash
# Terminal shows detailed error messages
# Copy error message for searching

# View logs from app runtime
expo start --verbose
```

### Search Stack Overflow
- Search error message
- Add "react-native" and "expo" tags

### Check Documentation
- Expo: docs.expo.dev
- React Native: reactnative.dev
- React Navigation: reactnavigation.org

### Create Issue on GitHub
- Include error message
- Describe reproduction steps
- Show code snippet

## 🎉 Next Steps

1. **Explore the code**: Understand the structure
2. **Make changes**: Customize colors, text, features
3. **Add API**: Replace mock API with real endpoints
4. **Test thoroughly**: Run through all scenarios
5. **Deploy**: Build and publish to app stores

---

Happy coding! 🚀

For questions or issues, check the README.md or reach out to the development team.
