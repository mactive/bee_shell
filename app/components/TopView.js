/**
 * mactive@gmail.com
 * 2017-05-08
 */

'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  DeviceEventEmitter
} from 'react-native';

class TopView extends Component {
  // 构造
  constructor(props) {
    super(props);
    // 初始状态
    this.state = {
      element: null
    };
  }
  componentWillMount() {
    DeviceEventEmitter.addListener("topViewAdd", this.setTopView.bind(this))
    DeviceEventEmitter.addListener("topViewRemove", this.removeTopView.bind(this))
  }

  componmentDidMount() {
    DeviceEventEmitter.removeAllListeners("topViewAdd")
    DeviceEventEmitter.removeAllListeners("topViewRemove")
  }
  setTopView(e) {
    let valid = React.isValidElement(e)
    return valid ? this.setState({ element: e }) : console.error("element must be valid react element?");
  }
  removeTopView() {
    this.setState({ element: null })
  }
  render() {
    return this.state.element
  }
}

const maskStyle = {
  style: {
    flex: 1,
    // position: 'absolute',
    // left: 0,
    // top: 0,
    // alignItems: 'center',
    // justifyContent: 'center',
    // backgroundColor: '#009900',
  }
}

let originRegisterComponent = AppRegistry.registerComponent
AppRegistry.registerComponent = function (element, func) {
  var reg = func();
  return originRegisterComponent(element, function(){
    console.log('--originRegisterComponent--');
    return React.createClass({
      render: function(){
        console.log('originRegisterComponent-render');
        return React.createElement(
          View,
          maskStyle,
          React.createElement(reg, this.props),
          React.createElement(TopView, null)
        )
      }
    })
  })
}


exports.default = {
  set: (e) => DeviceEventEmitter.emit("topViewAdd", e),
  remove: () => DeviceEventEmitter.emit("topViewRemove")
} 

module.exports = exports.default;