import React from 'react';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router-dom';
import reducer from './stores/modules';
import App from './App';
import { FETCH_SHOW_BEGIN, FETCH_SHOW_SUCCESS } from './stores/modules/series';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <StaticRouter location="someLocation" context={{}}>
      <App />
    </StaticRouter>, div,
  );
  ReactDOM.unmountComponentAtNode(div);
});


it('should return the initial state ', () => {
  expect(reducer(undefined, {})).toEqual({
    series: {
      episodeList: [], error: null, isFetching: false, show: {}, shows: [],
    },
  });
});


it('should handle FETCH_SHOW_BEGIN', () => {
  expect(
    reducer({}, {
      type: FETCH_SHOW_BEGIN,
    }),
  ).toEqual(
    {
      series: {
        episodeList: [], error: null, isFetching: true, show: {}, shows: [],
      },
    },
  );
});

it('should update show for type FETCH_SHOW_SUCCESS', () => {
  expect(
    reducer({}, {
      type: FETCH_SHOW_SUCCESS,
      result: 'test',
    }),
  ).toEqual(
    {
      series: {
        episodeList: [], error: null, isFetching: false, show: 'test', shows: [],
      },
    },
  );
});
