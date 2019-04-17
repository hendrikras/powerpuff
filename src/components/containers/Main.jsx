import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tile from '../views/Tile';
import { fetchShows, setSearch } from '../../stores/modules/series';
import { showMessage } from '../../Helpers';
import {
  Heading, Grid, Input,
} from '../styled/index';

class Main extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    const {
      fetchShows: getShows, search, setSearch: doSearch, searchQuery, match: { params: { query = '' } },
    } = this.props;
    if (query) {
      getShows(query);
      doSearch(query);
    } else if (search) {
      searchQuery(search);
    } else {
      this.textInput.current.focus();
    }
  }

  render() {
    const {
      changePage,
      shows,
      error,
      isFetching,
      setSearch: doSearch,
      search,
      fetchShows: getShows,
      searchQuery,
    } = this.props;

    const submit = (event) => {
      event.preventDefault();
      const { current: { value = '' } } = this.textInput;
      getShows(value);
      doSearch(value);
      searchQuery(value);
    };

    return showMessage(isFetching, error) || (
      <>
        <Heading>
          Serie finder
          <form
            onSubmit={submit}
          >
            <Input
              type="text"
              placeholder={search}
              ref={this.textInput}
            />
          </form>
        </Heading>
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
  search: null,
};

Main.propTypes = {
  search: PropTypes.string,
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
  setSearch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ series }) => series;

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchShows,
  setSearch,
  changePage: id => push(`/details/${id}`),
  searchQuery: query => push(`/search/${query}`),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
