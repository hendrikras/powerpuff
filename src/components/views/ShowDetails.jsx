import React from 'react';
import PropTypes from 'prop-types';
import { Column, Paragraph, Row } from '../styled';
import Summary from './Summary';

const ShowDetails = ({
  item: {
    premiered,
    runtime,
    type,
    ...rest
  },
}) => (
  <>
    <Row>
      <Column>
        <Paragraph>
          <b>Premiered: </b>
          {premiered}
        </Paragraph>
      </Column>
      <Column>
        <Paragraph>
          <b>Type: </b>
          {type}
        </Paragraph>
      </Column>
      <Column>
        <Paragraph>
          <b>Runtime: </b>
          {runtime}
        </Paragraph>
      </Column>
    </Row>
    <Summary item={rest} />
  </>
);

ShowDetails.propTypes = {
  item: PropTypes.shape({
    premiered: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    runtime: PropTypes.string.isRequired,
  }).isRequired,
};

export default ShowDetails;
