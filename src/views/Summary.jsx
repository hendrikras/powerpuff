import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import {
  Column, Image, Paragraph, Row,
} from '../styled';

const Summary = ({
  item: {
    summary = '', image: { medium },
  },
}) => (
  <>
    <Row>
      <Column>
        <Image src={medium} />
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
    image: PropTypes.object
    ,
  }).isRequired,
};

export default Summary;
