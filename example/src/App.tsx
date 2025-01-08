import * as React from 'react';

import { StyleSheet, View, Text, Alert, Platform } from 'react-native';
import { enableBioMetric,  checkBiometricSupport, checkNewFingerPrintAdded} from 'react-native-biometric-next';

export default function App() {

  React.useEffect(() => {
    if(Platform.OS === "ios"){
      enableBioMetric("Use passcode","Enter phone screen lock pattern, PIN, password or fingerprint",(res : any)=>{
        Alert.alert("Status",`${res}`);
      })
      return
    }
    checkNewFingerPrintAdded((res:any)=>{
      if(res==="NEW_FINGERPRINT_ADDED"){
        Alert.alert("Alert",res);
      }
    })
    checkBiometricSupport((res:string)=>{
      if(res === "SUCCESS"){
        enableBioMetric("Bio metric ","Enter phone screen lock pattern, PIN, password or fingerprint",(res : any)=>{
          Alert.alert("Status",`${res}`);
        })
      }else{
        Alert.alert("Alert",res);
      }
    })
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});