export const FETCH_SHOW_BEGIN = 'FETCH_SHOW_BEGIN';
export const FETCH_SHOW_SUCCESS = 'FETCH_SHOW_SUCCESS';
export const FETCH_EPISODE_SUCCESS = 'FETCH_EPISODE_SUCCESS';

export const FETCH_SHOWS_BEGIN = 'FETCH_SHOWS_BEGIN';
export const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';
export const SEARCH = 'SEARCH';

export const fetchShowsFailure = error => ({
  type: FETCH_FAILURE,
  payload: { error },
});
export const setSearch = search => ({
  type: SEARCH,
  payload: { search },
});

const arrayToObject = array => array.reduce((accumulator, item) => {
  accumulator[item.show.id] = item;
  return accumulator;
}, {});

const initialState = {
  error: null,
  search: 'girls',
  shows: {},
  episodeList: {},
  isFetching: false,
};

export default (state = initialState, action) => {
  const {
    id, result, error, payload: { search } = {},
  } = action;
  switch (action.type) {
    case FETCH_SHOWS_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };

    case FETCH_SHOWS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        shows: arrayToObject(result),
      };

    case FETCH_FAILURE:
      return {
        ...state,
        loading: false,
        error,
        items: [],
      };
    case FETCH_SHOW_BEGIN:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_SHOW_SUCCESS:
      return {
        ...state,
        shows: { [id]: { show: result } },
        isFetching: false,
      };
    case FETCH_EPISODE_SUCCESS:
      return {
        ...state,
        episodeList: { [id]: result },
        isFetching: false,
      };
    case SEARCH:
      return {
        ...state,
        search,
      };

    default:
      return state;
  }
};

const throwError = (response) => {
  throw Error(response.statusText);
};

const getData = (id, query, type) => (dispatch) => {
  dispatch({
    type: FETCH_SHOW_BEGIN,
  });
  const base = 'http://api.tvmaze.com';
  const url = `${base}/${query}`;
  fetch(url)
    .then(response => (response.ok ? response : throwError(response)))
    .then(response => response.json())
    .then((result) => {
      dispatch({
        id,
        type,
        result,
      });
    })
    .catch(error => dispatch(fetchShowsFailure(error)));
};


export const fetchShows = search => getData(search, `/search/shows?q=${search}`, FETCH_SHOWS_SUCCESS);
export const fetchShow = id => getData(id, `shows/${id}`, FETCH_SHOW_SUCCESS);
export const fetchEpisodes = id => getData(id, `shows/${id}/episodes`, FETCH_EPISODE_SUCCESS);
