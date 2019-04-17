import React from 'react';
import PropTypes from 'prop-types';
import { Image, Spacer, Title } from '../styled';

const Cover = ({
  image, height, width, children,
}) => (
  image
    ? <Image alt="banner" src={image.medium} />
    : (
      <Spacer height={height} width={width}>
        <Title>{children}</Title>
      </Spacer>
    ));

export default Cover;

Cover.defaultProps = {
  children: null,
  image: null,
};

Cover.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  children: PropTypes.node,
  image: PropTypes.shape({ medium: PropTypes.string }),
};
