import React ,{ Component, PropTypes } from 'react';
import { 
  View, 
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
  Modal,
  Animated,
  Easing,
} from 'react-native';

const screen = Dimensions.get('window');

class PopupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
      // modalVisible: visible,

      // scale:
      position: new Animated.Value(this.getPosition(props.visible))
      // opacity:
    };
    console.log(props)
  }

  static propTypes = {
    visible: PropTypes.bool,
    onMaskClose: PropTypes.func,
    maskClosable: PropTypes.bool,
    /**
     * 距离顶部/底部的距离
     */
    distanceOffset: PropTypes.number,
    // 动画方向和类型
    animationType: PropTypes.string,
  };

  /**
   * 默认props
   * 
   * @static
   * 
   * @memberof PopupContainer
   */
  static defaultProps = {
    maskClosable: true,
    distanceOffset: 20,
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

  computedStyle = (options) => {
    console.log(this.props.distanceOffset);
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'transparent'
      },
      mask: {
        position: 'absolute',
        top: this.props.distanceOffset,
        left: 0,
        bottom: 0,
        right: 0,
        width: screen.width,
        height: screen.height - this.props.distanceOffset,
        backgroundColor: '#00000050',
      },
      content: {
        backgroundColor: 'purple',
      },
      button: {
        marginTop: 100,
        backgroundColor: 'red'
      }
    })
    return styles;
  }

  stopDialogAnim() {
    if (this.animDialog) {
      this.animDialog.stop();
      this.animDialog = null;
    }
  }

  getPosition(visible) {
    if (visible) {
      return 0;
    }
    return this.props.animationType === 'slide-down' ? -screen.height : screen.height;
  }

  animateDialog(visible) {
    this.stopDialogAnim();

    const { animationType } = this.props;
    if (animationType !== 'none') {
      if (animationType === 'slide-up' || animationType === 'slide-down') {
        this.state.position.setValue(this.getPosition(!visible));
        this.animDialog = Animated.timing(
          this.state.position,
          {
            toValue: this.getPosition(visible),
            duration: this.props.animationDuration,
            easing: (visible ? Easing.elastic(0.8) : undefined),
          },
        );
      } 
      // TODO: fade,scale,opacity 关键字
      // else if (animationType === 'fade') {
      //   this.animDialog = Animated.parallel([
      //     Animated.timing(
      //       this.state.opacity,
      //       {
      //         toValue: this.getOpacity(visible),
      //         duration: this.props.animationDuration,
      //         easing: (visible ? Easing.elastic(0.8) : undefined),
      //       },
      //     ),
      //     Animated.spring(
      //       this.state.scale,
      //       {
      //         toValue: this.getScale(visible),
      //         duration: this.props.animationDuration,
      //         easing: (visible ? Easing.elastic(0.8) : undefined),
      //       },
      //     ),
      //   ]);
      // }

      this.animDialog.start(() => {
        this.animDialog = null;
        // if (!visible) {
        //   this.setState({
        //     modalVisible: false,
        //   });
        // }
        this.props.onAnimationEnd(visible);
      });
    } else {
      // if (!visible) {
      //   this.setState({
      //     modalVisible: false,
      //   });
      // }
    }
  }

  render() {
    // TODO: 这个地方的style 可能要换一下
    const styles = this.computedStyle();

    const animationStyleMap = {
      none: {},
      'slide-up': { transform: [{ translateY: this.state.position }] },
      'slide-down': { transform: [{ translateY: this.state.position }] },
      // fade: { transform: [{ scale: this.state.scale }], opacity: this.state.opacity },
    };

    return(
      <Modal
        visible={this.props.visible}
        transparent={true}
      >
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.onMaskClosable.bind(this)}>
            <View style={styles.mask}>
              <Animated.View
                style={[styles.content, animationStyleMap[this.props.animationType]]}
              >
                  <TouchableWithoutFeedback onPress={this.onMaskClose.bind(this)}>
                    <View>
                      <Text style={styles.button}>
                        close
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                  {this.props.children}
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    );
  }

  componentDidMount(){
    if (this.props.animationType !== 'none') {
      this.componentDidUpdate({});
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.visible !== this.props.visible){
      this.animateDialog(this.props.visible)
    }
  }
}

export default PopupContainer;
