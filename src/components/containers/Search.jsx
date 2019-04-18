import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tile from '../views/Tile';
import SearchBar from '../views/SearchBar';
import { fetchShows, setSearch } from '../../stores/modules/series';
import { showMessage } from '../../Helpers';

import {
  Grid,
} from '../styled/index';

class Main extends Component {
  componentDidMount() {
    const {
      fetchShows: getShows, match: { params: { query = '' } },
    } = this.props;
    if (query) {
      getShows(query);
    }
  }

  render() {
    const {
      changePage,
      shows,
      error,
      isFetching,
      fetchShows: getShows,
      searchQuery,
      match: { params: { query } },
    } = this.props;

    const submit = (value) => {
      getShows(value);
      searchQuery(value);
    };

    return showMessage(isFetching, error) || (
      <>
        <SearchBar onSubmit={submit} search={query} />
        <Grid>
          {Object.values(shows)
            .map(({ show }) => (
              <Tile
                key={show.id}
                item={show}
                height={295}
                width={210}
                onClick={() => changePage(show.id)}
              />
            ))}
        </Grid>
      </>
    );
  }
}

Main.defaultProps = {
  error: null,
};

Main.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  match: PropTypes.shape().isRequired,
  error: PropTypes.shape({
    body: PropTypes.object,
  }),
  shows: PropTypes.shape({
    show: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      summary: PropTypes.string,
      image: PropTypes.shape({ medium: PropTypes.string }),
    }),
  }).isRequired,
  searchQuery: PropTypes.func.isRequired,
  changePage: PropTypes.func.isRequired,
  fetchShows: PropTypes.func.isRequired,
};

const mapStateToProps = ({ series }) => series;

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchShows,
  changePage: id => push(`/details/${id}`),
  searchQuery: query => push(`/search/${query}`),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
