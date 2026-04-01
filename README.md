# GBV Reporting and Support App - ZYGA

A comprehensive React Native mobile application for reporting gender-based violence (GBV) and accessing support services. Built with modern mobile-first design, the app provides a safe platform for survivors to report incidents, access psychological support, and connect with local resources.

## 🌟 Features

### 1. **Authentication System**
- Email/Phone login
- User registration with validation
- Anonymous mode for privacy
- Secure session management with AsyncStorage

### 2. **Report Incident**
- Multi-step form with validation
- Incident details (title, description, type)
- Date and time selection
- Optional location tracking (GPS)
- Media uploads (photos, videos)
- Offline support

### 3. **Psychological Support**
- Real-time chat with AI support bot
- Mock AI responses for immediate assistance
- Option to connect with counselors
- Confidential environment

### 4. **Information & Education**
- International policies and agreements
- Human rights information
- Local laws specific to Tanzania and Zanzibar
- Expandable content for detailed learning

### 5. **Support Services Directory**
- Hospital locator
- Police station information
- NGO contacts
- Emergency services with one-tap calling

### 6. **Safe Voice - Stories**
- Community stories from survivors
- Share personal experiences
- Like and share functionality
- Anonymous storytelling option

### 7. **Emergency Contacts**
- One-tap emergency calling
- Police, medical, and fire services
- Quick action buttons with visual hierarchy
- Safety tips and resources

### 8. **Feedback System**
- Star rating system
- Feedback submission
- Anonymous feedback option
- Continuous improvement focus

### 9. **Home Dashboard**
- Quick action cards
- Resource links
- Recent activity tracking
- Welcome messaging

### 10. **User Profile**
- Account information
- Settings management
- Privacy controls
- Logout functionality

## 📁 Project Structure

```
/src
├── /assets                     # Images and icons
├── /components                 # Reusable UI components
│   ├── Button.js              # Custom button component
│   ├── Input.js               # Text input with validation
│   ├── Card.js                # Card container
│   ├── Dropdown.js            # Dropdown selector
│   ├── LoadingIndicator.js   # Loading spinner
│   ├── EmptyState.js          # Empty state display
│   └── Alert.js               # Alert/Toast component
├── /constants                  # App constants
│   └── colors.js              # Theme colors and spacing
├── /context                    # React Context for state management
│   └── UserContext.js         # User authentication context
├── /data                       # Mock data
│   └── mockData.js            # Static data for development
├── /navigation                 # React Navigation setup
│   ├── AuthNavigator.js       # Authentication flow
│   ├── AppNavigator.js        # Main app navigation
├── /screens                    # Screen components
│   ├── /auth
│   │   ├── LoginScreen.js
│   │   ├── RegisterScreen.js
│   │   └── OnboardingScreen.js
│   └── /app
│       ├── HomeScreen.js
│       ├── ReportIncidentScreen.js
│       ├── PsychologicalSupportScreen.js
│       ├── InformationScreen.js
│       ├── SupportServicesScreen.js
│       ├── SafeVoiceScreen.js
│       ├── LocalLawsScreen.js
│       ├── EmergencyContactScreen.js
│       ├── AddStoryScreen.js
│       ├── FeedbackScreen.js
│       ├── ProfileScreen.js
│       ├── InternationalPoliciesScreen.js
│       └── HumanRightsScreen.js
├── /services                   # API and storage services
│   ├── apiService.js          # Mock API endpoints
│   └── storageService.js      # AsyncStorage management
└── /utils                      # Utility functions
    └── validation.js          # Form validation utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

1. **Clone or extract the project**
```bash
cd "GBV report system"
```

2. **Install dependencies**
```bash
npm install
```

3. **Start the development server**
```bash
npm start
# or
expo start
```

4. **Run on a device or emulator**
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go app on your phone

### Quick Start with Expo Go

1. Download Expo Go from App Store or Play Store
2. Run `npm start` in the project directory
3. Scan the QR code with Expo Go

## 🎨 Design Features

### Color Palette
- **Primary**: #1E88E5 (Blue)
- **Secondary**: #43A047 (Green)
- **Danger**: #E53935 (Red)
- **Warning**: #FFA726 (Orange)
- **Accent**: #FB8C00

### Typography
- Clean, modern font hierarchy
- Accessible contrast ratios
- Responsive text sizing

### UI Components
- Bottom tab navigation with 5 main tabs
- Stack navigation for detailed views
- Card-based layouts
- Smooth animations and transitions
- Accessible touch targets (min 48x48 points)

## 📱 Navigation Structure

```
AuthNavigator (When logged out)
├── Onboarding
├── Login
└── Register

AppNavigator (When logged in)
├── Tabs
│   ├── Home (Stack)
│   │   ├── Home
│   │   ├── Report Incident
│   │   ├── Local Laws
│   │   └── Emergency Contact
│   ├── Help (Stack)
│   │   └── Psychological Support
│   ├── Learn (Stack)
│   │   ├── Information
│   │   ├── International Policies
│   │   └── Human Rights
│   ├── Services (Stack)
│   │   └── Support Services
│   └── Stories (Stack)
│       ├── Safe Voice
│       └── Add Story
├── Profile
└── Feedback
```

## 🔐 Data Management

### AsyncStorage
- User authentication data
- Saved incidents (offline)
- User stories
- Feedback submissions
- Settings preferences

### Mock API
- Realistic API endpoints
- Simulated network delays
- Success/error handling
- Pre-configured responses

## 📝 Form Validation

Built-in validation for:
- Email format
- Password strength (min 6 chars, uppercase, number)
- Phone number (Tanzania format: +255, 0, or 255)
- Required fields
- Minimum/maximum length
- Custom validation rules

## 🔔 Features Highlights

### Security & Privacy
- Confidential reporting
- Anonymous mode support
- Encrypted storage (ready for production)
- No data sharing without consent
- Privacy policy screen

### Accessibility
- High contrast colors
- Readable font sizes
- Touch-friendly buttons
- Clear navigation
- Icon labeling

### Offline Support
- Incidents saved locally
- Stories cached
- Sync when connection restored
- Graceful error handling

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web
npm run web

# Run tests
npm test
```

### Environment Variables
Create `.env` file for production:
```
API_BASE_URL=https://api.gbv-app.com
API_TIMEOUT=10000
LOG_LEVEL=info
```

## 📦 Dependencies

### Core
- `react`: 18.2.0
- `react-native`: 0.73.0
- `expo`: 50.0.0

### Navigation
- `@react-navigation/native`: 6.1.9
- `@react-navigation/bottom-tabs`: 6.5.11
- `@react-navigation/stack`: 6.3.20

### Storage
- `@react-native-async-storage/async-storage`: 1.21.0

### UI & Icons
- `react-native-vector-icons`: 10.0.0
- `react-native-elements`: 3.4.3

### Media
- `expo-image-picker`: 15.0.0
- `expo-camera`: 14.0.0
- `expo-location`: 17.0.0
- `expo-av`: 14.0.0

### Utilities
- `axios`: 1.6.2
- `date-fns`: 2.34.0

## 🚀 Deployment

### Build for Production

#### iOS
```bash
eas build --platform ios
```

#### Android
```bash
eas build --platform android
```

#### Web
```bash
npm run web
# Then deploy to hosting service
```

## 🐛 Troubleshooting

### Common Issues

**Issue**: App won't start
```bash
# Clear cache and reinstall
npm install
expo start -c
```

**Issue**: Storage not persisting
- Check AsyncStorage permissions
- Verify platform-specific storage setup
- Check device storage space

**Issue**: Location not working
- Ensure location permissions are granted
- Check device location settings
- Test in physical device (simulators have limitations)

**Issue**: Camera/Photo picker not working
- Grant media library permissions
- Check device settings
- Verify app permissions in system settings

## 📖 Usage Guide

### For Users

1. **First Time**
   - Download and open the app
   - Choose to login, register, or continue anonymously
   - Complete any onboarding

2. **Report an Incident**
   - Tap "Report Now" on home screen
   - Fill in incident details
   - Add media and location (optional)
   - Review and submit

3. **Get Support**
   - Chat with AI support bot
   - Connect with counselors
   - Find local services

4. **Learn More**
   - Browse policies and laws
   - Understand your rights
   - Share your story

### For Developers

1. **Add New Screen**
   - Create file in `/screens/app/`
   - Add navigation in `AppNavigator.js`
   - Import required components

2. **Add New API Endpoint**
   - Update `apiService.js`
   - Add mock response
   - Add storage if needed

3. **Customize Theme**
   - Edit `colors.js`
   - Update color references
   - Test accessibility

## 🤝 Contributing

To contribute to this project:
1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is available for use in supporting GBV victims and survivors.

## 🙏 Acknowledgments

- Built with React Native and Expo
- Designed for ZYGA (Zanzibar Youth Gender Alliance)
- Inspired by real survivor needs
- Supported by gender rights organizations

## 📞 Support

For issues or questions:
- Contact the development team
- Check the FAQ section in-app
- Visit support services page

## 🎯 Future Enhancements

- [ ] Real API integration
- [ ] Video call counseling
- [ ] Multi-language support
- [ ] Offline incident queuing
- [ ] Biometric authentication
- [ ] Push notifications
- [ ] Social features (follow organizations)
- [ ] Advanced reporting analytics
- [ ] Integration with official services
- [ ] Machine learning for better recommendations

---

**Version**: 1.0.0  
**Last Updated**: 2024  
**Status**: Production Ready for Testing
