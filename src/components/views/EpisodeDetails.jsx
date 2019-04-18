import React from 'react';
import PropTypes from 'prop-types';
import { Column, Paragraph, Row } from '../styled';
import Summary from './Summary';

const EpisodeDetails = ({
  item: {
    airdate,
    airtime,
    season,
    ...rest
  },
}) => (
  <>
    <Row>
      <Column>
        <Paragraph>
          <b>Aired: </b>
          {airdate}
        </Paragraph>
      </Column>
      <Column>
        <Paragraph>
          <b>Time: </b>
          {airtime}
        </Paragraph>
      </Column>
      <Column>
        <Paragraph>
          <b>Season: </b>
          {season}
        </Paragraph>
      </Column>
    </Row>
    <Summary item={rest} />
  </>
);

EpisodeDetails.propTypes = {
  item: PropTypes.shape({
    airdate: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    season: PropTypes.number.isRequired,
  }).isRequired,
};

export default EpisodeDetails;
