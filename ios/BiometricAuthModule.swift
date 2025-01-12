import Foundation
import LocalAuthentication
import React

@objc(BiometricAuthModule)
class BiometricAuthModule: NSObject, BiometricAuthSpec {

    @objc
    func isBiometricAvailable(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        let context = LAContext()
        var error: NSError?

        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            let biometricType = context.biometryType
            switch biometricType {
            case .faceID:
                resolve("FaceID")
            case .touchID:
                resolve("TouchID")
            default:
                resolve("None")
            }
        } else if context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error) {
            resolve("Passcode")
        } else {
            resolve("None")
        }
    }

    @objc
    func authenticate(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        let context = LAContext()
        var error: NSError?

        if context.canEvaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, error: &error) {
            let reason = "Please authenticate using Face ID or Touch ID"
            context.evaluatePolicy(.deviceOwnerAuthenticationWithBiometrics, localizedReason: reason) { success, authenticationError in
                DispatchQueue.main.async {
                    if success {
                        resolve(true)
                    } else {
                        self.fallbackToPasscode(resolve: resolve, reject: reject)
                    }
                }
            }
        } else if context.canEvaluatePolicy(.deviceOwnerAuthentication, error: &error) {
            fallbackToPasscode(resolve: resolve, reject: reject)
        } else {
            DispatchQueue.main.async {
                resolve("None")
            }
        }
    }

    private func fallbackToPasscode(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        let context = LAContext()
        let reason = "Please enter your device passcode to proceed"

        context.evaluatePolicy(.deviceOwnerAuthentication, localizedReason: reason) { success, error in
            DispatchQueue.main.async {
                if success {
                    resolve(true)
                } else {
                    reject("PASSCODE_AUTHENTICATION_FAILED", "Passcode authentication failed", error)
                }
            }
        }
    }
}
