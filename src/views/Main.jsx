import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Tile from './Tile';
import { fetchShows, setSearch } from '../stores/modules/series';
import { showMessage, stubImage } from './Helpers';
import {
  Heading, Grid, Input,
} from '../styled';

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
      changePage, shows, error, isFetching, setSearch: doSearch, search,
    } = this.props;

    return showMessage(isFetching, error) || (
      <>
        <Heading>
        Serie finder
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const { fetchShows: getShows } = this.props;
              const { current: { value = '' } } = this.textInput;
              getShows(value);
              doSearch(value);
            }}
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
              item={stubImage(show, 210, 295)}
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
  search: 'girls',
};

Main.propTypes = {
  search: PropTypes.string,
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
