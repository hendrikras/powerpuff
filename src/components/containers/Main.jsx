import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tile from '../views/Tile';
import { fetchShows, setSearch } from '../../stores/modules/series';
import { showMessage, stubImage } from '../../Helpers';
import {
  Heading, Grid, Input,
} from '../styled/index';

class Main extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    const { fetchShows: getShows, search } = this.props;
    getShows(search);
  }

  render() {
    const {
      changePage, shows, error, isFetching, setSearch: doSearch, search, fetchShows: getShows,
    } = this.props;

    const submit = (event) => {
      event.preventDefault();
      const { current: { value = '' } } = this.textInput;
      getShows(value);
      doSearch(value);
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
          {Object.values(shows).map(({ show }) => (
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
  search: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    body: PropTypes.object,
  }),
  shows: PropTypes.shape({
    show: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      summary: PropTypes.string,
      image: PropTypes.object,
    }),
  }).isRequired,
  changePage: PropTypes.func.isRequired,
  fetchShows: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ series }) => series;

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchShows,
  setSearch,
  changePage: id => push(`/details/${id}`),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
