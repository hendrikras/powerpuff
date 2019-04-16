import ReactHtmlParser from 'react-html-parser';
import React from 'react';
import PropTypes from 'prop-types';

import {
  Button, CardHeading,
} from '../styled';
import { textTruncate } from '../../Helpers';
import Cover from './Cover';

const reducer = (accumulator, current) => accumulator + current;

function transform(node) {
  if (!node.prev) {
    const innerElements = node.children && node.children
      .map(({ children = [], data }) => (children.length > 0 ? children[0].data : data))
      .reduce(reducer, '');
    return textTruncate(innerElements, 100, '...');
  }
  return null;
}

const Tile = ({
  onClick,
  height,
  width,
  item: {
    name, summary, image,
  },
}) => (
  <Button onClick={onClick}>
    <Cover image={image} height={height} width={width}>
      {name}
    </Cover>
    <CardHeading>{ name }</CardHeading>
    { ReactHtmlParser(
      !summary || summary === ''
        ? `No information is currently available for ${name}`
        : summary, { transform },
    )}
  </Button>
);

Tile.defaultProps = {
  onClick: () => null,
};

Tile.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.object,
  }).isRequired,
};

export default Tile;
