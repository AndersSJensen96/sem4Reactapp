import React, {useRef, useState} from 'react'
import {Text, StyleSheet, View, Image, Pressable, Animated} from 'react-native'
import { Navigation } from 'react-native-navigation';

const Part = (props) => {

  const AnimationProcess = useRef(new Animated.Value(0)).current;
  const [AnimationRunning, setAnimationRunning] = useState(false);

    const OpenModal = async () =>{
        await Navigation.showModal({
            component:{
                name:'Modal',
                passProps:{
                    object:props.object,
                    componentId:props.componentId
                }
            }
        });
    }

  const ClickAnimation = () => {
    setAnimationRunning(true);
    AnimationProcess.setValue(0);
    Animated.timing(AnimationProcess, {
        duration:700,
        useNativeDriver:false,
        toValue:1,
    }).start(({finished})=>{
      if(finished){
        
        setAnimationRunning(false);
        OpenModal();
      }
    })
    
}
  
  //interpolate width and opacity of overlay 
    const interpolateOpacity = AnimationProcess.interpolate({
      inputRange:[0,0.3, 0.5,0.8,1],
      outputRange:[0,0.5,1,0.5,0],
      useNativeDriver:true,
    })
    const interpolateWidth = AnimationProcess.interpolate({
      inputRange:[0,0.5,1],
      outputRange:['0%','50%','100%'],
      useNativeDriver:true,
    })
    return (
        <Pressable style={[styles.OuterWrapper, ]} onPress={ClickAnimation}>
          <Animated.View style={[styles.overlay, 
            {
                width:(AnimationRunning) ? interpolateWidth : '0%', 
                opacity:(AnimationRunning) ? interpolateOpacity : 0
            }
          ]}/>
          <View style={styles.InsideWrapper}>
            <Image source={{uri:`data:image/png;base64,${props.object.images}`}} 
            
            style={styles.PartImage}/>
            <View style={styles.PartInfo}>
              <Text style={styles.InfoText}>{props.object.name}</Text>
              <Text style={[styles.InfoText,{color:'#CCC'}]}>{'>'}</Text>
            </View>
          </View>
        </Pressable>
    ); 
  };
  
 

  const styles = StyleSheet.create({
    OuterWrapper:{
      backgroundColor:'#fcfcfc', 
      aspectRatio:5,
    },
    overlay:{
      position:'absolute',
      backgroundColor:'#DDD', //Change later
      height:'100%',
    },
    InsideWrapper:{
      flexDirection:'row',
      borderColor:'#000',
      borderBottomWidth:1,
      justifyContent:'space-between',
      flex:1,
      padding:10,
      marginHorizontal:15
    },
    PartImage:{
      flex:1,
    },
    PartInfo:{
      flex:3,
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingLeft:15,
    },
    InfoText:{
      color:'#000',
      fontWeight:'bold',
      fontSize:15,
    }
  });
  
  export default Part;
  