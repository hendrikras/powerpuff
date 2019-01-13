import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchEpisodes } from '../stores/modules/series';
import { Button, Grid, GridItem } from '../styled';

const Details = ({
  show: {
    id,
    name,
    summary = 'pending',
    image: {
      medium = 'http://www.hutterites.org/wp-content/uploads/2012/03/placeholder.jpg',
    } = {},
  },
  episodeList,
  fetchEpisodes: fetch,
}) => (
  <>
    <div>
      <img alt="cover" src={medium} />
      <h1>
        { name }
      </h1>
      { ReactHtmlParser(summary) }
    </div>
    <Grid>
      { episodeList.map(episode => (
        <GridItem key={episode.id}>
          <Button primary>{ episode.name }</Button>
        </GridItem>
      ))}
    </Grid>
    {
      episodeList.length === 0
    && (<Button onClick={() => fetch(id)}>Show episodes</Button>)
    }

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
