import React, { useEffect, useState } from "react";
import { Button, SafeAreaView, Text } from "react-native";
import {
  checkAvailability,
  authenticate,
  BiometricEnums,
} from "react-native-simple-biometrics";

const App = () => {
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

export default App;