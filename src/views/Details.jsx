import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import showMessage from './Helpers';
import { fetchEpisodes, fetchShow, setShow } from '../stores/modules/series';
import Tile from './Tile';
import {
  Button, Grid, Image, Row, Column, Heading, Paragraph,
} from '../styled';

class Details extends Component {
  componentDidMount() {
    const {
      setShow: useShow,
      fetchShow: getShow,
      match: { params: { id } },
      shows,
    } = this.props;
    const found = shows.find(({ show: { id: idx } }) => idx === Number.parseInt(id, 10));
    if (found) {
      useShow(found.show);
    } else {
      getShow(id);
    }
  }

  render() {
    const {
      isFetching,
      error,
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
    } = this.props;

    return showMessage(isFetching, error) || (
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
              { episodeList.map(episode => (<Tile item={episode} showSummary key={episode.id} />)) }
            </Grid>
            {
      episodeList.length === 0
    && (<Button primary onClick={() => fetch(id)}>Show episodes</Button>)
    }
          </Column>
        </Row>
      </>
    );
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
  setShow: PropTypes.func.isRequired,
  fetchShow: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  shows: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  show: PropTypes.shape({
    show: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      summary: PropTypes.string,
      image: PropTypes.object,
    }),
  }).isRequired,
  episodeList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.object,
    }),
  ).isRequired,
  fetchEpisodes: PropTypes.func.isRequired,
};

const mapStateToProps = ({ series }) => series;

const mapDispatchToProps = dispatch => bindActionCreators({
  setShow,
  fetchShow,
  fetchEpisodes,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
