import React from 'react';
import CameraButton from './src/Components/CameraButton'
import {SafeAreaView, StyleSheet, Platform} from 'react-native'
const App = (props) => {

  return (
    <SafeAreaView style={styles.MainWindow}>
      <CameraButton componentId={props.componentId}/>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  MainWindow:{
    paddingTop: Platform.OS == 'android' ? 25:0,
    backgroundColor:'rgb(3, 115, 252)',
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
});
export default App