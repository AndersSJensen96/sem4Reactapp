import React, {useState, useEffect} from 'react'
import {Text, StyleSheet, TouchableHighlight, View, Image} from 'react-native'
import Part from './Part'
import DynamicButton from './DynamicButton'
import {Navigation} from 'react-native-navigation'
const ShowPartsModal = (props) => {
    const [Title, setTitle] = useState()

    useEffect(()=>{
      setTitle(props.object.title)
    },[])

    return (
      <View style={styles.MainWindow}>
          <Image  
            source={{uri:'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'}}
            style={styles.imgStyle}  
          />
          <View style={styles.Info}>
            <Text style={styles.Title}>{Title}</Text>
          </View>
          <View style={styles.ButtonsWrapper}>
            <DynamicButton title="Close" 
            onPressEvent={()=>Navigation.dismissModal(props.componentId)}
            ButtonStyle={[styles.CloseButton, styles.Buttons]}
            TitleStyle={styles.ButtonTitles}
            />
            <DynamicButton title="Buy"  
            onPressEvent={()=>console.log('Redirect or smth')}
            ButtonStyle={[styles.BuyButton, styles.Buttons]}
            TitleStyle={styles.ButtonTitles}
            />
          </View>
          
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    MainWindow:{
      flex:1,
    },
    imgStyle:{
      flex:5,
    },
    Info:{
      flex:1,
    },
    Title:{
      textAlign:'center',
      fontSize:25,
      fontWeight:'bold'
    },
    ButtonsWrapper:{
      flex:2,
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center'
    },
    Buttons:{
      paddingVertical:20,
      width:'45%',
      justifyContent:'center',
      alignItems:'center',
      borderRadius:4,
    },
    ButtonTitles:{
      color:'#F25252',
    },  
    BuyButton:{
      borderWidth:2,
      opacity: 0.8,
      borderColor:'#0373FC',
    },
    CloseButton:{
      borderWidth:2,
      opacity: 0.8,
      borderColor:'#F25252',
    },
  });
  
  export default ShowPartsModal;
  