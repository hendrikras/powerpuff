import React from 'react';
import PropTypes from 'prop-types';

import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../views/SearchBar';
import { showMessage } from '../../Helpers';

const Main = ({
  error,
  isFetching,
  searchQuery,
  match: { params: { query } },
}) => showMessage(isFetching, error) || (
<SearchBar onSubmit={value => searchQuery(value)} search={query} />
);

Main.defaultProps = {
  error: null,
};

Main.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    body: PropTypes.object,
  }),
  searchQuery: PropTypes.func.isRequired,
};

const mapStateToProps = ({ series }) => series;

const mapDispatchToProps = dispatch => bindActionCreators({
  searchQuery: query => push(`/search/${query}`),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
