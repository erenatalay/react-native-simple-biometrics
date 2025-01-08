package com.simplebiometric;

import android.os.Build
import android.os.Handler
import android.os.Looper
import androidx.biometric.BiometricManager
import androidx.biometric.BiometricPrompt
import androidx.core.content.ContextCompat
import androidx.fragment.app.FragmentActivity
import com.facebook.react.bridge.*
import java.util.concurrent.Executor

class BiometricAuthModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val mainHandler = Handler(Looper.getMainLooper())
    private var biometricPrompt: BiometricPrompt? = null

    companion object {
        const val AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED"
        const val AUTHENTICATION_ERROR = "AUTHENTICATION_ERROR"
        const val BIOMETRIC_NOT_AVAILABLE = "BIOMETRIC_NOT_AVAILABLE"
        const val ACTIVITY_ERROR = "ACTIVITY_ERROR"
    }

    override fun getName(): String = "BiometricAuthModule"

    @ReactMethod
    fun isBiometricAvailable(promise: Promise) {
        mainHandler.post {
            try {
                val biometricManager = BiometricManager.from(reactApplicationContext)
                val canAuthenticate = biometricManager.canAuthenticate()

                when (canAuthenticate) {
                    BiometricManager.BIOMETRIC_SUCCESS -> {
                        if (isFaceRecognitionAvailable()) {
                            promise.resolve("FaceRecognition")
                        } else {
                            promise.resolve("Fingerprint")
                        }
                    }
                    BiometricManager.BIOMETRIC_ERROR_NONE_ENROLLED -> promise.resolve("NoBiometricsEnrolled")
                    BiometricManager.BIOMETRIC_ERROR_NO_HARDWARE -> promise.resolve("None")
                    else -> promise.resolve("Passcode")
                }
            } catch (e: Exception) {
                promise.reject("ERROR", e.message)
            }
        }
    }

    @ReactMethod
    fun authenticate(promise: Promise) {
        mainHandler.post {
            try {
                val biometricManager = BiometricManager.from(reactApplicationContext)
                val canAuthenticate = biometricManager.canAuthenticate()

                if (canAuthenticate != BiometricManager.BIOMETRIC_SUCCESS) {
                    promise.reject(BIOMETRIC_NOT_AVAILABLE, "Biometric authentication is not available")
                    return@post
                }

                val activity = currentActivity as? FragmentActivity
                if (activity == null) {
                    promise.reject(ACTIVITY_ERROR, "The current activity is null")
                    return@post
                }

                val executor: Executor = ContextCompat.getMainExecutor(reactApplicationContext)
                
                biometricPrompt = BiometricPrompt(activity, executor,
                    object : BiometricPrompt.AuthenticationCallback() {
                        override fun onAuthenticationSucceeded(result: BiometricPrompt.AuthenticationResult) {
                            promise.resolve(true)
                        }

                        override fun onAuthenticationFailed() {
                            promise.reject(AUTHENTICATION_FAILED, "Authentication failed")
                        }

                        override fun onAuthenticationError(errorCode: Int, errString: CharSequence) {
                            promise.reject(AUTHENTICATION_ERROR, errString.toString())
                        }
                    })

                val promptInfo = BiometricPrompt.PromptInfo.Builder()
                    .setTitle("Authentication Required")
                    .setDescription("Authenticate with your biometric credential")
                    .setNegativeButtonText("Cancel")
                    .build()

                biometricPrompt?.authenticate(promptInfo)
            } catch (e: Exception) {
                promise.reject("ERROR", e.message)
            }
        }
    }

    private fun isFaceRecognitionAvailable(): Boolean {
        return Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q
    }

    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        biometricPrompt = null
    }
}