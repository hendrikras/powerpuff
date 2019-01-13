import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchEpisodes } from '../stores/modules/series';
import {
  Button, Grid, GridItem, Image, Row, Column, Heading, Paragraph,
} from '../styled';

const Details = ({
  show: {
    id,
    name,
    summary = 'pending',
    image: {
      medium = 'http://placehold.it/210x295',
    } = {},
  },
  episodeList = [],
  fetchEpisodes: fetch,
}) => (
  <>
    <Row>
      <Column>
        <Image alt="cover" src={medium} />
      </Column>
      <Column>
        <Heading>
          { name }
        </Heading>
        <Paragraph>
          { ReactHtmlParser(summary) }
        </Paragraph>
      </Column>
    </Row>
    <Row>
      <Column>
        <Grid>
          {episodeList.length > 0 && episodeList.map(episode => (
            <GridItem key={episode.id}>
              <Button primary>{ episode.name }</Button>
            </GridItem>
          ))}
        </Grid>
        {
      episodeList.length === 0
    && (<Button onClick={() => fetch(id)}>Show episodes</Button>)
    }
      </Column>
    </Row>
  </>
);


Details.propTypes = {
  show: PropTypes.shape().isRequired,
  episodeList: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  isFetching: PropTypes.bool.isRequired,
  fetchEpisodes: PropTypes.func.isRequired,
};

const mapStateToProps = ({ series }) => series;

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchEpisodes,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
