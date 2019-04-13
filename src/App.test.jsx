import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router-dom';
import { showMessage, stubImage, stubSummary, textTruncate } from './Helpers';
import reducer from './stores/modules';
import App from './App';
import { FETCH_SHOW_BEGIN, FETCH_SHOW_SUCCESS } from './stores/modules/series';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <StaticRouter location="someLocation" context={{}}>
      <App/>
    </StaticRouter>, div
  );
  ReactDOM.unmountComponentAtNode(div);
});

it('should truncate text', () => {

  expect(stubSummary({
    summary: '',
    name: 'test'
  }).summary)
    .toEqual('There is no description available for test');
});

it('should return an error message ', () => {
  expect(showMessage())
    .toEqual(false);
  expect(showMessage(true, false))
    .toEqual(<h2>loading..</h2>);
  expect(showMessage(false, 'error'))
    .toEqual(<h2>error</h2>);
});

it('should truncate text', () => {
  expect(textTruncate('bla', 100, ''))
    .toEqual('bla');
  expect(textTruncate('123', 2, '!'))
    .toEqual('1!');
});


it('should return an object with stubimage ', () => {
  expect(stubImage({ name: 'test', summary: 'summary'}, 250, 140))
    .toEqual({
      image: { medium: 'https://placehold.it/250x140/db7093/FFF?text=test' },
      name: 'test',
      summary: 'summary'
    });
});

it('should return the initial state ', () => {
  expect(reducer(undefined, {}))
    .toEqual({
      series: {
        episodeList: {},
        error: null,
        isFetching: false,
        shows: {},
        search: 'girls'
      }
    });
});


it('should handle FETCH_SHOW_BEGIN', () => {
  expect(
    reducer({}, {
      type: FETCH_SHOW_BEGIN
    }).series.isFetching
  )
    .toEqual(true);
});

it('should update show for type FETCH_SHOW_SUCCESS', () => {
  expect(
    reducer({}, {
      type: FETCH_SHOW_SUCCESS,
      result: 'test',
      id: 1
    }).series.shows
  )
    .toEqual({ 1: { show: 'test' } });
});
