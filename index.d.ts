import { BiometricTypeEnums } from './src/biometrics.types';

declare module 'react-native-simple-biometrics' {
  export type BiometricType = keyof typeof BiometricTypeEnums;
  export const BiometricEnums = {
    FaceID = 'FaceID',
    TouchID = 'TouchID',
    Passcode = 'Passcode',
    None = 'None',
  };
  export function checkAvailability(): Promise<BiometricType>;
  export function authenticate(): Promise<boolean>;
}
