import React from 'react';
import PropTypes from 'prop-types';

import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchShow } from '../stores/modules/series';
import { Button, Column, Row, Heading, Grid, GridItem } from '../styled';

const navigateDetails = (id, fetch, changePage) => {
  fetch(id);
  changePage();
};

const Main = ({
  fetchShow: fetch, changePage, ids,
}) => (
  <Row>
    <Column>
      <Heading>Series</Heading>
    </Column>
    <Column>
      <Grid>
        { ids.map(id => (
          <GridItem key={id}>
            <Button primary type="button" onClick={() => navigateDetails(id, fetch, changePage)}>
              {id}
            </Button>
          </GridItem>
        ))}
      </Grid>
    </Column>
  </Row>
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
