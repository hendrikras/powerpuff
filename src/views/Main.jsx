import React from 'react';
import PropTypes from 'prop-types';

import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/Episodes'),
}, dispatch);

const Main = ({ changePage }) => (
  <div>
    <h1>Series</h1>
    <button type="button" onClick={() => changePage()}>PowerPuff Girls</button>
  </div>
);


Main.propTypes = {
  changePage: PropTypes.func.isRequired,
};

export default connect(
  null,
  mapDispatchToProps,
)(Main);
