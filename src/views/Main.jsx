import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tile from './Tile';
import { fetchShows } from '../stores/modules/series';
import {
  Column, Row, Heading, Grid,
} from '../styled';

class Main extends Component {
  componentDidMount() {
    const { fetchShows: getShows } = this.props;
    getShows();
  }

  render() {
    const {
      changePage, shows, error,
    } = this.props;
    return (
      <>
        <Heading>Series</Heading>
        { error ? (<h2>{error.toString()}</h2>)
          : (
            <Row>
              <Column>
                <Grid>
                  {shows.map(({ show }) => (
                    <Tile
                      key={show.id}
                      item={show}
                      onClick={() => changePage(show.id)}
                    />
                  ))}
                </Grid>
              </Column>
            </Row>
          )}
      </>
    );
  }
}

Main.defaultProps = {
  error: null,
};

Main.propTypes = {
  error: PropTypes.shape({
    body: PropTypes.object,
  }),
  shows: PropTypes.arrayOf(PropTypes.shape({
    show: PropTypes.object,
  })).isRequired,
  changePage: PropTypes.func.isRequired,
  fetchShows: PropTypes.func.isRequired,
};

const mapStateToProps = ({ series }) => series;

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchShows,
  changePage: id => push(`/details/${id}`),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
