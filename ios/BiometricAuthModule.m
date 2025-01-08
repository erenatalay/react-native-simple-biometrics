#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(BiometricAuthModule, NSObject)

RCT_EXTERN_METHOD(isBiometricAvailable:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(authenticate:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

@end
