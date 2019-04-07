import ReactHtmlParser from 'react-html-parser';
import React from 'react';
import PropTypes from 'prop-types';

import {
  Button, CardHeading, Image,
} from '../styled';

const Tile = ({
  showSummary,
  onClick,
  item: {
    name, summary, image: { medium },
  },
}) => (
  <Button onClick={onClick}>
    <Image alt="banner" src={medium} />
    <CardHeading>{ name }</CardHeading>
    { showSummary && ReactHtmlParser(summary)}
  </Button>
);

Tile.defaultProps = {
  showSummary: false,
  onClick: () => null,
};

Tile.propTypes = {
  showSummary: PropTypes.bool,
  onClick: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.object,
  }).isRequired,
};

export default Tile;
