import React from 'react';
import TopView from '../TopView';
import PopupContainer from './PopupContainer';

let popupInstance;

export default {
  show(content, options = {
    animationType: 'slide-down',
    maskClosable: true,
    onMaskClose() {},
  }) {
    TopView.set(
      <PopupContainer
        ref={i => popupInstance = i}
        onMaskClose={options.onMaskClose}
        onAnimationEnd={visible => { if (!visible) { TopView.remove(); } }}
        visible
      >
        {content}
      </PopupContainer>,
    );
  },
  hide() {
    if (popupInstance) {
      popupInstance.hide();
    }
  },
};

//        maskClosable={options.maskClosable}

