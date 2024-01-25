import React from 'react'
import {Pressable, Text} from 'react-native'

const DynamicButton = (props) => {
    return(
        <Pressable style={props.ButtonStyle} onPress={()=>props.onPressEvent()}>
            <Text 
            style={[props.TitleStyle]
            }>{props.title}</Text>
        </Pressable>
    );
}
export default DynamicButton