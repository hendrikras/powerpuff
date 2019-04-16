import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import {
  Column, Paragraph, Row,
} from '../styled/index';
import Cover from './Cover';

const Summary = ({
  item: {
    summary = '', image, name,
  },
}) => (
  <>
    <Row>
      <Column>
        <Cover image={image} width={210} height={295}>
          { name }
        </Cover>
      </Column>
      <Column>
        <Paragraph>
          {ReactHtmlParser(summary)}
        </Paragraph>
      </Column>
    </Row>
  </>
);

Summary.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.shape({ medium: PropTypes.string }),
  }),
};

Summary.defaultProps = {
  item: {
    id: 0,
    name: 'Summary',
    summary: 'pending',
    image: {
      medium: 'http://placehold.it/210x295',
    },
  },
};

export default Summary;
