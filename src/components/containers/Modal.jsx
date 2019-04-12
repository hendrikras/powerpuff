import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import { Button, StyledModal } from '../styled/index';

const Slot = ({ children, slot, defaultSlot }) => {
  let slottedChild = null;
  React.Children.forEach(children, (child) => {
    if (child.props.slot === slot) {
      slottedChild = React.cloneElement(child);
    }
    return null;
  });
  if (!slottedChild && defaultSlot) {
    slottedChild = defaultSlot;
  }

  return slottedChild;
};

export default class Modal extends PureComponent {
  render() {
    const {
      children, onCancel, visible,
    } = this.props;
    const defaultFooter = (
      <>
        <Button
          small
          primary
          onClick={onCancel}
        >
          close
        </Button>
      </>
    );

    return (
      <CSSTransition
        in={visible}
        classNames="modal"
        timeout={{
          enter: 0,
          exit: 350,
        }}
        unmountOnExit
      >
        <StyledModal>
          <div className="modal-wrapper">
            <div className="modal-container">
              <div className="modal-header">
                <Slot defaultSlot={<h1>Default Header</h1>} slot="header">
                  {children}
                </Slot>
              </div>

              <div className="modal-body">
                <Slot defaultSlot={<content>Default body</content>} slot="body">
                  {children}
                </Slot>
              </div>

              <div className="modal-footer">
                <Slot slot="footer" defaultSlot={defaultFooter}>
                  {children}
                </Slot>
              </div>
            </div>
          </div>
        </StyledModal>
      </CSSTransition>
    );
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onCancel: PropTypes.func,
  visible: PropTypes.bool,
};
Modal.defaultProps = {
  visible: false,
  onCancel: () => {},
};
