import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { showMessage, stubImage } from './Helpers';
import { fetchEpisodes, fetchShow } from '../stores/modules/series';
import Tile from './Tile';
import {
  Button, Grid, Row, Column,
} from '../styled';
import Modal from '../containers/Modal';
import Summary from './Summary';

class Details extends Component {
  constructor(props) {
    super(props);
    this.state = { episode: null, showModal: false };
  }

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
    const { episode, showModal } = this.state;
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
      const { show } = shows[idx];

      return showMessage(isFetching, error) || (
        <>
          <Modal
            visible={showModal}
            onCancel={() => this.setState({ showModal: false })}
          >
            <h3 slot="header">{ episode && episode.name }</h3>
            <div slot="body">
              <Summary item={episode} />
            </div>
          </Modal>
          <Summary item={show} />
          {
                episodeList[idx] ? (
                  <Grid>
                    {episodeList[idx]
                      .map(episode => (
                        <Tile
                          item={stubImage(episode, 250, 140)}
                          key={episode.id}
                          onClick={() => this.setState({ episode: episode, showModal: true })}
                        />
                      ))}
                  </Grid>
                ) : (
                  <Row>
                    <Column>
                      <Button primary onClick={() => fetch(show.id)}>Show episodes</Button>
                    </Column>
                  </Row>
                )
              }
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
