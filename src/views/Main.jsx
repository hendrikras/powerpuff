import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { push } from 'connected-react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchShow, fetchShows } from '../stores/modules/series';
import {
  Button, Column, Row, Heading, Grid, GridItem,
} from '../styled';

const navigateDetails = (id, fetch, changePage) => {
  fetch(id);
  changePage();
};

class Main extends Component {
  componentDidMount() {
    const { fetchShows: getShows } = this.props;
    getShows();
  }

  render() {
    const {
      fetchShow: fetch, changePage, shows, error,
    } = this.props;
    return (
      <>
        <Heading>Series</Heading>
        { error ? (<h2>{error.toString()}</h2>)
          : (
            <Row>
              <Column>
                <Grid>
                  {shows.map(({ show: { id, name } }) => (
                    <GridItem key={id}>
                      <Button type="button" onClick={() => navigateDetails(id, fetch, changePage)}>
                        {name}
                      </Button>
                    </GridItem>
                  ))}
                </Grid>
              </Column>
            </Row>
          )}
      </>
    );
  }
}

Main.defaultProps = {
  error: null,
};

Main.propTypes = {
  error: PropTypes.shape({
    body: PropTypes.object,
  }),
  shows: PropTypes.arrayOf(PropTypes.shape({
    show: PropTypes.object,
  })).isRequired,
  changePage: PropTypes.func.isRequired,
  fetchShow: PropTypes.func.isRequired,
  fetchShows: PropTypes.func.isRequired,
};

const mapStateToProps = ({ series }) => series;

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchShow,
  fetchShows,
  changePage: () => push('/details'),
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
