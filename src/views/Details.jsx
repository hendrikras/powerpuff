import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';


import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchEpisodes, fetchShow } from '../stores/modules/series';
import {
  Button, CardHeading, Grid, GridItem, Image, Row, Column, Heading, Paragraph,
} from '../styled';

class Details extends Component {
  componentDidMount() {
    const { fetchShow: getShow, match: { params: { id } } } = this.props;
    getShow(id);
  }

  render() {
    const {
      show: {
        id,
        name,
        summary = 'pending',
        image: {
          medium = 'http://placehold.it/210x295',
        } = {},
      },
      episodeList = [],
      fetchEpisodes: fetch,
    } = this.props;

    return (
      <>
        <Row>
          <Column>
            <Image alt="cover" src={medium} />
          </Column>
          <Column>
            <Heading>
              { name }
            </Heading>
            <Paragraph>
              { ReactHtmlParser(summary) }
            </Paragraph>
          </Column>
        </Row>
        <Row>
          <Column>
            <Grid>
              {episodeList.length > 0 && episodeList.map(episode => (
                <GridItem key={episode.id}>
                  <Button>
                    {episode.image && episode.image.medium && <Image src={episode.image.medium} /> }
                    <CardHeading>{ episode.name }</CardHeading>
                    <div>{ ReactHtmlParser(episode.summary) }</div>
                  </Button>
                </GridItem>
              ))}
            </Grid>
            {
      episodeList.length === 0
    && (<Button primary onClick={() => fetch(id)}>Show episodes</Button>)
    }
          </Column>
        </Row>
      </>
    );
  }
}


Details.propTypes = {
  fetchShow: PropTypes.func.isRequired,
  match: PropTypes.shape().isRequired,
  show: PropTypes.shape({
    show: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      summary: PropTypes.string,
      image: PropTypes.object,
    }),
  }).isRequired,
  episodeList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      image: PropTypes.object,
    }),
  ).isRequired,
  fetchEpisodes: PropTypes.func.isRequired,
};

const mapStateToProps = ({ series }) => series;

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchShow,
  fetchEpisodes,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Details);
