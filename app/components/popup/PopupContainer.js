import React ,{ Component, PropTypes } from 'react';
import { 
  View, 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
    marginTop: 100,
    backgroundColor: 'red'
  }
})

class PopupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false
    };
    console.log(props)
  }

  static propTypes = {
    visible: PropTypes.bool,
    onMaskClose: PropTypes.func,
    maskClosable: PropTypes.bool,
  };

  static defaultProps = {
    maskClosable: true,
  }

  hide(){
    this.setState({
      visible: false,
    })
    // 模拟触发 onAnimationEnd
    setTimeout(()=>{
      this.props.onAnimationEnd();
    },100)
  }

  /**
   * 判断mask是否支持点击关闭
   * 
   * @memberof PopupContainer
   */
  onMaskClosable = () => {
    if(!this.props.maskClosable){
      console.log('maskClosable has been set to false');
      return;
    } else {
      this.onMaskClose();
    }
  }

  /**
   * 先执行用户定义的 func
   * 然后执行PopupContainer 的关闭
   * 
   * @memberof PopupContainer
   */
  onMaskClose = () => {
    const onMaskClose = this.props.onMaskClose;
    if(onMaskClose) {
      // 回传一些数据回去
      const res = onMaskClose(this.props);
      // 如果有返回值但必须是promise
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
        <TouchableWithoutFeedback onPress={this.onMaskClosable.bind(this)}>
        <View style={styles.mask}>
          <TouchableOpacity onPress={this.onMaskClose.bind(this)}>
            <Text style={styles.button}>
              close
            </Text>
          </TouchableOpacity>
          
          {this.props.children}
        </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default PopupContainer;
