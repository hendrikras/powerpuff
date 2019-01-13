import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchShow } from '../stores/modules/series';

const Details = ({ show }) => (
  <div>
    <h1>
      { show.name }
    </h1>
    { ReactHtmlParser(show.summary) }
  </div>
);


Details.propTypes = {
  show: PropTypes.object.isRequired, // eslint-disable-line
};

const mapStateToProps = ({ series }) => ({
  show: series.show,
  isFetching: series.isFetching,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchShow,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
