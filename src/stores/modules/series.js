export const FETCH_SHOW_BEGIN = 'FETCH_SHOW_BEGIN';
export const FETCH_SHOW_SUCCESS = 'FETCH_SHOW_SUCCESS';
export const FETCH_EPISODE_SUCCESS = 'FETCH_EPISODE_SUCCESS';

export const FETCH_SHOWS_BEGIN = 'FETCH_SHOWS_BEGIN';
export const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS';
export const FETCH_FAILURE = 'FETCH_FAILURE';

export const fetchShowsFailure = error => ({
  type: FETCH_FAILURE,
  payload: { error },
});

const arrayToObject = array => array.reduce((serie, item) => {
  serie[item.show.id] = item; //eslint-disable-line
  return serie;
}, {});

const initialState = {
  error: null,
  shows: {},
  episodeList: {},
  isFetching: false,
};

export default (state = initialState, action) => {
  const { id, result, error } = action;
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

    default:
      return state;
  }
};

const throwError = (response) => {
  throw Error(response.statusText);
};

const getData = (type, id) => (dispatch) => {
  dispatch({
    type: FETCH_SHOW_BEGIN,
  });
  const base = 'http://api.tvmaze.com';
  const search = id ? `shows/${id}` : '/search/shows?q=girls';
  const url = `${base}/${search}`;
  fetch(type === FETCH_EPISODE_SUCCESS ? url.concat('/episodes') : url)
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

export const setShow = result => (dispatch) => {
  dispatch({ type: FETCH_SHOW_SUCCESS, result });
};

export const fetchShows = () => getData(FETCH_SHOWS_SUCCESS);
export const fetchShow = id => getData(FETCH_SHOW_SUCCESS, id);
export const fetchEpisodes = id => getData(FETCH_EPISODE_SUCCESS, id);
