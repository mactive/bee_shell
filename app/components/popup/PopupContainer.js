import React from 'react';
import { 
  View, 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';

const {
    width,
    height,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    zIndex: 1000,
    position: 'absolute',
    flex: 1
  },
  mask: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: '#00000030',
  },
  button: {
    backgroundColor: 'red'
  }
})

class PopupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false
    };
    console.log(props)
  }

  hide(){
    this.setState({
      visible: false,
    })
    // 模拟触发 onAnimationEnd
    setTimeout(()=>{
      this.props.onAnimationEnd();
    },1000)
  }

  onMaskClose = () => {
    const onMaskClose = this.props.onMaskClose;
    if(onMaskClose) {
      const res = onMaskClose('from popupContainer');
      // 如果有返回值必须是promise
      if(res && res.then) {
        res.then(() => {
          this.hide();
        })
      } else {
        this.hide();
      }
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <View 
          style={styles.mask}
        >

          <TouchableOpacity onPress={this.onMaskClose.bind(this)}>
            <Text style={styles.button}>
              close
            </Text>
          </TouchableOpacity>
          
          {this.props.children}
        </View>
      </View>
    );
  }
}

export default PopupContainer;
