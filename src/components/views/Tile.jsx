import ReactHtmlParser from 'react-html-parser';
import React from 'react';
import PropTypes from 'prop-types';

import {
  Button, CardHeading, Image,
} from '../styled/index';
import { textTruncate } from '../../Helpers';

const reducer = (accumulator, current) => accumulator + current;

function transform(node) {
  if (node.type === 'tag' && node.name === 'p') {
    const filtered = node.children
      .filter(el => el.type === 'text')
      .map(item => item.data)
      .reduce(reducer, '');
    return textTruncate(filtered, 100, '...');
  }
  return null;
}

const Tile = ({
  onClick,
  item: {
    name, summary, image: { medium },
  },
}) => (
  <Button onClick={onClick}>
    <Image alt="banner" src={medium} />
    <CardHeading>{ name }</CardHeading>
    { ReactHtmlParser(summary, { transform })}
  </Button>
);

Tile.defaultProps = {
  onClick: () => null,
};

Tile.propTypes = {
  onClick: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.object,
  }).isRequired,
};

export default Tile;
