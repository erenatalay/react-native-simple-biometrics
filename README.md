# react-native-simple-biometrics

## Overview

Biometric authentication, such as Face ID or fingerprint scanning, provides secure and user-friendly access to mobile applications. `react-native-simple-biometrics` is designed to simplify the integration of biometric authentication across both iOS and Android platforms. With this package, developers can enhance the user experience while ensuring robust security.

---

## Permissions

### iOS Permissions

Add the following key to your `info.plist` file to describe the use of Face ID or Touch ID:

```xml
<key>NSFaceIDUsageDescription</key>
<string>This app uses Face ID for secure authentication.</string>
```

### Android Permissions

Update your `AndroidManifest.xml` file with the appropriate permissions based on the API level:

#### For API Level 28 and above:

```xml
<uses-permission android:name="android.permission.USE_BIOMETRIC" />
```

#### For API Levels below 28:

```xml
<uses-permission android:name="android.permission.USE_FINGERPRINT" />
```

These configurations are essential for enabling biometric functionality on the respective platforms.

---

## Installation

Install the library using npm or yarn:

```bash
npm install react-native-simple-biometrics
# or
yarn add react-native-simple-biometrics
```

---

## Usage Guide

### Example Code

Here’s a basic implementation of the `react-native-simple-biometrics` library:

```javascript
import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import {
  checkAvailability,
  authenticate,
  BiometricEnums,
} from "react-native-simple-biometrics";

const BiometricSimple = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isAuth, setAuth] = useState(false);

  useEffect(() => {
    const checkBiometrics = async () => {
      try {
        const available = await checkAvailability();
        setIsSupported(available !== BiometricEnums.None);
      } catch (error) {
        setIsSupported(false);
      }
    };

    checkBiometrics();
  }, []);

  const handleAuth = async () => {
    try {
      const result = await authenticate();
      if (result) {
        setAuth(true);
      }
    } catch {
      setAuth(false);
    }
  };

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Biometric Authentication
      </Text>

      {isAuth && (
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Secret Text</Text>
      )}

      {isSupported && !isAuth ? (
        <Button title="Authenticate" onPress={handleAuth} />
      ) : (
        <Text>Biometric authentication is not supported on this device</Text>
      )}
    </SafeAreaView>
  );
};

export default BiometricSimple;
```

### Steps to Implement

1. Import the required functions (`checkAvailability`, `authenticate`, and `BiometricEnums`) from the library.
2. Use `checkAvailability()` to determine if biometrics are supported on the device and what type is available.
3. Call `authenticate()` to prompt the user for biometric authentication.
4. Display results or handle errors appropriately based on your app’s requirements.

---

## Platform-Specific Notes

### iOS Notes
- Ensure a meaningful description is added in `info.plist` to comply with App Store guidelines.
- Biometric authentication might fail due to:
  - Hardware limitations.
  - Biometrics being locked after multiple failed attempts.
  - Lack of enrolled biometric data.

### Android Notes
- API 28 and above utilize the `BiometricPrompt` class for authentication.
- Devices running older versions rely on fingerprint-specific permissions (`USE_FINGERPRINT`).

---

## Error Handling

### Common Issues
- **Unsupported Devices**: Verify that the device has the necessary hardware and that biometrics are enabled.
- **Permission Errors**: Double-check the permissions in your app’s configuration files.
- **Locked Biometrics**: Handle scenarios where biometrics are temporarily locked.

### Recommended Practices
- Use meaningful error messages to guide users through resolving issues (e.g., enrolling biometrics, unlocking features).
- Provide alternative authentication options for unsupported devices.

---

## Testing Recommendations

To ensure robust functionality:
- Test on a variety of devices with different biometric capabilities.
- Simulate error cases, such as failed authentication attempts or unsupported hardware.

---

## License

This package is distributed under the MIT License. See the LICENSE file for details.

---

## Contributing

We welcome contributions from the community! Submit issues or pull requests on the GitHub repository to help improve the package.

