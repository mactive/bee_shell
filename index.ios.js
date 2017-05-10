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
import MenuListView from './app/views/MenuListView'
export default class bee_shell extends Component {
  constructor(props){
    super(props)
    this.tt = 'tt';
  }
  _onPressButton(){
    const dataSource = [
      {id: '001', isSelected: false, text: '001'},
      {id: '002', isSelected: false, text: '002'},
      {id: '003', isSelected: false, text: '003'},
    ]
    Popup.show(
      <MenuListView 
        selectPanelInfo={dataSource} 
        onPress={(selectedChoice) => {
          // 将这个和 onMaskClose 绑定起来
          console.log(selectedChoice);
          Popup.hide();
        }}
      >
      </MenuListView>,
      {
        onMaskClose: (e) => {
          // 用户点击自带的关闭按钮时做一些事情
          console.log('Popup props',e)
        },
        // maskClosable: true,
        // distanceOffset: 100,
        animationType: 'slide-down'
      }
    );
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
