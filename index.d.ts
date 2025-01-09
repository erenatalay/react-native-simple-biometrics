import { BiometricTypeEnums } from './src/biometrics.types';

enum BiometricEnums {
  FaceID = 'FaceID',
  TouchID = 'TouchID',
  Passcode = 'Passcode',
  None = 'None',
}
declare module 'react-native-simple-biometrics' {
  export type BiometricType = keyof typeof BiometricTypeEnums;

  export function checkAvailability(): Promise<BiometricType>;

  export function authenticate(): Promise<boolean>;

  export { BiometricEnums };
}
