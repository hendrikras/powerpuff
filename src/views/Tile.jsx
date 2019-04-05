import ReactHtmlParser from 'react-html-parser';
import React from 'react';
import PropTypes from 'prop-types';

import {
  Button, CardHeading, GridItem, Image,
} from '../styled';

const Tile = ({
  showSummary,
  onClick,
  item: {
    name, summary, image: { medium },
  },
}) => (
  <GridItem>
    <Button onClick={onClick}>
      { medium && <Image alt="banner" src={medium} /> }
      <CardHeading>{ name }</CardHeading>
      { showSummary && <div>{ ReactHtmlParser(summary) }</div> }
    </Button>
  </GridItem>
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
