/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity
} from 'react-native';
import Contacts from './app/views/Contacts'
import Popup from './app/components/popup'
export default class bee_shell extends Component {
  constructor(props){
    super(props)
    this.tt = 'tt';
  }
  _onPressButton(){
    Popup.show(<View><Text>0000000</Text></View>,{
      onMaskClose: (e) => {
        console.log(this.tt)
        console.log(e)
      }
    });
  }
  render() {
    console.log('index.ios.js-render');
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._onPressButton.bind(this)}>
          <Text style={styles.title}>
            show Contacts
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // _configureScene(route, routeStack){
  //   if(route.modalType === 'present'){
  //     return Navigator.SceneConfigs.FloatFromBottom;
  //   }else{
  //     return Navigator.SceneConfigs.FloatFromRight;
  //   }
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('bee_shell', () => bee_shell);
