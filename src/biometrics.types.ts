export enum BiometricTypeEnums {
    FaceID = 'FaceID',
    TouchID = 'TouchID',
    Passcode = 'Passcode',
    None = 'None'
  }
  export type BiometricType =
    | BiometricTypeEnums.FaceID
    | BiometricTypeEnums.TouchID
    | BiometricTypeEnums.Passcode
    | BiometricTypeEnums.None;

