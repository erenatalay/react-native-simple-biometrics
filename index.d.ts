import type { BiometricType } from './src';

declare module 'react-native-simple-biometrics' {
  export function checkAvailability(): Promise<BiometricType>;

  export function authenticate(): Promise<boolean>;

  export * from './src/biometrics.types';
}
