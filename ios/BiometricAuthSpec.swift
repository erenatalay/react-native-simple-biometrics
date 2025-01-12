import Foundation

@objc(BiometricAuthSpec)
protocol BiometricAuthSpec: NSObjectProtocol {
    func isBiometricAvailable(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock)
    func authenticate(_ resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock)
}
