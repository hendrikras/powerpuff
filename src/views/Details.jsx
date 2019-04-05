import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import showMessage from './Helpers';
import { fetchEpisodes, fetchShow } from '../stores/modules/series';
import Tile from './Tile';
import {
  Button, Grid, Image, Row, Column, Heading, Paragraph,
} from '../styled';

class Details extends Component {
  componentDidMount() {
    const {
      fetchShow: getShow,
      match: { params: { id } },
      shows,
    } = this.props;
    if (!shows[id]) {
      getShow(id);
    }
  }

  render() {
    const {
      isFetching,
      error,
      shows,
      match,
      episodeList = {},
      fetchEpisodes: fetch,
    } = this.props;
    const { params: { id: idx } } = match;
    if (shows[idx]) {
      const {
        id,
        name,
        summary = 'pending',
        image: {
          medium = 'http://placehold.it/210x295',
        } = {},
      } = shows[idx].show;

      return showMessage(isFetching, error) || (
        <>
          <Row>
            <Column>
              <Image alt="cover" src={medium} />
            </Column>
            <Column>
              <Heading>
                {name}
              </Heading>
              <Paragraph>
                {ReactHtmlParser(summary)}
              </Paragraph>
            </Column>
          </Row>
          <Row>
            <Column>
              {
                episodeList[idx] ? (
                  <Grid>
                    {episodeList[idx]
                      .filter(item => item.image)
                      .map(episode => (<Tile item={episode} showSummary key={episode.id} />))}
                  </Grid>
                ) : (<Button primary onClick={() => fetch(id)}>Show episodes</Button>)
              }
            </Column>
          </Row>
        </>
      );
    }
    return <div>loading..</div>;
  }
}

Details.defaultProps = {
  error: null,
};

Details.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    body: PropTypes.object,
  }),
  fetchShow: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  shows: PropTypes.shape({
    show: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      summary: PropTypes.string,
      image: PropTypes.object,
    }),
  }).isRequired,
  episodeList: PropTypes.shape({
    id: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        image: PropTypes.object,
      }),
    ),
  }).isRequired,
  fetchEpisodes: PropTypes.func.isRequired,
};

const mapStateToProps = ({ series }) => series;

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchShow,
  fetchEpisodes,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
