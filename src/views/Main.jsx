import React from 'react';
import PropTypes from 'prop-types';

import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchShow } from '../stores/modules/series';
import { Column, Row } from '../styled';

const navigateDetails = (id, fetch, changePage) => {
  fetch(id);
  changePage();
};

const Main = ({
  isFetching, fetchShow: fetch, changePage, ids,
}) => (
  <div>
    <h1>Series</h1>

    <Row>
      { ids.map(id => (
        <Column key={id}>
          <button type="button" disabled={isFetching} onClick={() => navigateDetails(id, fetch, changePage)}>
            {id}
          </button>
        </Column>
      ))}
    </Row>
  </div>
);


Main.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  isFetching: PropTypes.bool.isRequired,
  changePage: PropTypes.func.isRequired,
  fetchShow: PropTypes.func.isRequired,
  show: PropTypes.object.isRequired, // eslint-disable-line
};

const mapStateToProps = ({ series }) => ({
  show: series.show,
  ids: series.ids,
  isFetching: series.isFetching,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchShow,
  changePage: () => push('/details'),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
