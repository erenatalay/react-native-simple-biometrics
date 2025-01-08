import type { BiometricTypeEnums } from "./src/biometrics.types";

declare module 'react-native-simple-biometrics' {
    export type BiometricType = keyof typeof BiometricTypeEnums;
    export function checkAvailability(): Promise<BiometricType>;
    export function authenticate(): Promise<boolean>;
 
  }