import React, {useState,useRef} from 'react'
import {Text, StyleSheet, View, Pressable, Animated, Easing, Alert} from 'react-native'
import {Navigation} from 'react-native-navigation'
import * as ImagePicker from 'react-native-image-picker'

const CameraButton = (props) => {
    //State for saving Base64 image string (not sure if actually ever needed since i just send it off in the fecth to the api)
    const AnimationProgress = useRef(new Animated.Value(0)).current;
    const [AnimationRunning, setAnimationRunning] = useState(false);

    //#region methods
    //Navigation to the modal with data from api
    const NextPage = async (data) =>{
        await Navigation.push(props.componentId, {component:{name:'PartsList', passProps:{base64:data}}})
    }

    //starts camera and sends base64 string through api , no permissions setup
    //since they're already set in the manifest for android (Look into that maybe?)
    const StartCamera = async()=>{
        ImagePicker.launchCamera({
            mediaType:'photo',
            includeBase64: true,
        },(response)=>{
            //setImgBase64(response.base64); Not sure if state is needed for this.
            if(!response.didCancel){
                NextPage(response.base64)
            }else{
                Alert.alert('Camera was closed', 'You closed the camera before taking a picture')
            }
            
        })
    }
    //#endregion
    
    //#region Animations
    const RippleEffect = () =>{
        AnimationProgress.setValue(0);
        setAnimationRunning(true);
        Animated.timing(AnimationProgress,{
            toValue: 1,
            duration:500,
            easing:Easing.linear(),
            useNativeDriver:false
        }).start(({finished})=>{
            if(finished){
                setAnimationRunning(false);
                StartCamera();
            }
        });
    }
    //#endregion
    //#region Interpolations
    const SizeInterPolate = AnimationProgress.interpolate({
        inputRange:[0,1],
        outputRange:[200, 300],
        useNativeDriver:true,
        extrapolate:'extend',
    })
    const OpacityInterpolate = AnimationProgress.interpolate({
        inputRange:[0,0.5,1],
        outputRange:[0,0.5,0],
        useNativeDriver:true,
    })
    //#endregion
    //#region AnimationStyles
    const RippleAnimationStyle = {
        width:(AnimationRunning) ? SizeInterPolate : 210,
        height:(AnimationRunning) ? SizeInterPolate : 210,
        opacity:(AnimationRunning) ? OpacityInterpolate : 0.3,
    }
    //#endregion

    return (
        <Pressable style={styles.ButtonGestureWrapper} onPress={()=>RippleEffect()}>
            <Animated.View style={[styles.Ripple, RippleAnimationStyle]}/>
            <View style={styles.OpenCameraButton}>
              <Text style={styles.TextInsideButton}>Take picture</Text>
            </View>
        </Pressable>
    );
  };
  
  const styles = StyleSheet.create({
    ButtonGestureWrapper:{
        justifyContent:'center',
        alignItems:'center'
        
    },
    OpenCameraButton:{
        width:200,
        height:200,
        borderRadius:150,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
    },
    Ripple:{
        backgroundColor:'#fff',
        position:'absolute',
        borderRadius:150,
    },  
    TextInsideButton:{
        color:'#3772FF',
        fontSize:25,
        fontWeight:'bold',
    }
  })

  export default CameraButton;
  