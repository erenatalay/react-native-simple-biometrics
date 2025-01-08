import { NativeModules, Platform } from 'react-native';

import { BiometricTypeEnums, type BiometricType } from './biometrics.types';

const LINKING_ERROR =
  `The package 'react-native-biometric-next' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const BiometricAuthModule = NativeModules.BiometricAuthModule
  ? NativeModules.BiometricAuthModule
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const checkAvailability = async (): Promise<BiometricType> => {
  try {
    const result = await BiometricAuthModule.isBiometricAvailable()
    return result as BiometricType
  } catch (error) {
    return BiometricTypeEnums.None
  }
}

export const authenticate = async (): Promise<BiometricType> => {
  try {
    const result = await BiometricAuthModule.authenticate()
    return result as BiometricType
  } catch (error) {
    return BiometricTypeEnums.None
  }
}
