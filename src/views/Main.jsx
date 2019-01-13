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
  fetchShow: fetch, changePage, ids,
}) => (
  <div>
    <h1>Series</h1>

    <Row>
      { ids.map(id => (
        <Column key={id}>
          <button type="button" onClick={() => navigateDetails(id, fetch, changePage)}>
            {id}
          </button>
        </Column>
      ))}
    </Row>
  </div>
);


Main.propTypes = {
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
  changePage: PropTypes.func.isRequired,
  fetchShow: PropTypes.func.isRequired,
};

const mapStateToProps = ({ series }) => series;

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchShow,
  changePage: () => push('/details'),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
