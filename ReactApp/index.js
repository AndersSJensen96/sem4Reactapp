import {Navigation} from 'react-native-navigation'
import App from './App';
import Modal from './src/Components/ShowPartsModal'
import PartsList from './src/Components/PartsList'
Navigation.registerComponent('App', ()=>App);
Navigation.registerComponent('PartsList', ()=>PartsList)
Navigation.registerComponent('Modal', ()=>Modal)

const MainRoot = {
    root:{
        stack:{
            children:[{
                component:{
                    name: 'App',
                    options:{
                        topBar:{
                            visible:false,
                        }
                    }
                },
            }]
        }
    }
}

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot(MainRoot);
  })