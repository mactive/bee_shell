import React, { Component, PropTypes } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView
} from 'react-native';

const {
  width,
  height,
} = Dimensions.get('window');

const styles = StyleSheet.create({
  selectPanel: {
    backgroundColor: '#fff',
    maxHeight: 200,
    height: 200,
    width,
    position: 'absolute',
    top: 45,
  },
  selectItem: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 15,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  basicSelectText: {
    color: '#333333',
    fontSize: 14,
  },
  selectText: {
    color: '#FECB2E',
  },
  icon: {
    color: '#FECB2E',
    marginRight: 15,
  },
});

class MenuListView extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  static propTypes = {
    selectPanelInfo: PropTypes.array,
    onPress: PropTypes.func,
  };

  renderPanelItem() {
    if (this.props.selectPanelInfo.length === 0) {
      return null;
    }
    return this.props.selectPanelInfo.map((choice) => {
      return (
        <TouchableOpacity
          style={styles.selectItem}
          key={'choice' + choice.id}
          onPress={() => {
            if (this.props.onPress) {
              this.props.onPress(choice);
            }
          }}
        >
          <Text
            style={[
              styles.basicSelectText,
              choice.isSelected && styles.selectText,
            ]}
          >
            {choice.text}
          </Text>
        </TouchableOpacity>
      );
    });
  }

  render() {
    if (this.props.selectPanelInfo.length === 0) {
      return null;
    }
    const panelItems = this.renderPanelItem();
    return (
      <View style={styles.selectPanel}>
        <ScrollView>
          {panelItems}
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default MenuListView;
