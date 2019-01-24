export const SHOW_REQUESTED = 'SHOW_REQUESTED';
export const SHOW = 'SHOW';
export const EPISODELIST = 'EPISODELIST';

export const FETCH_SHOWS_BEGIN = 'FETCH_SHOWS_BEGIN';
export const FETCH_SHOWS_SUCCESS = 'FETCH_SHOWS_SUCCESS';
export const FETCH_SHOWS_FAILURE = 'FETCH_SHOWS_FAILURE';

export const fetchShowsBegin = () => ({
  type: FETCH_SHOWS_BEGIN,
});

export const fetchShowsSuccess = shows => ({
  type: FETCH_SHOWS_SUCCESS,
  payload: { shows },
});

export const fetchShowsFailure = error => ({
  type: FETCH_SHOWS_FAILURE,
  payload: { error },
});

const initialState = {
  error: null,
  show: {},
  shows: [],
  episodeList: [],
  isFetching: false,
};

export default (state = initialState, action) => {
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
        shows: action.result,
      };

    case FETCH_SHOWS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
    case SHOW_REQUESTED:
      return {
        ...state,
        isFetching: true,
        episodeList: [],
      };
    case SHOW:
      return {
        ...state,
        show: action.result,
        isFetching: false,
      };
    case EPISODELIST:
      return {
        ...state,
        episodeList: action.result,
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
    type: SHOW_REQUESTED,
  });
  const base = 'http://api.tvmaze.com';
  const search = id ? `shows/${id}` : '/search/shows?q=girls';
  const url = `${base}/${search}`;
  fetch(type === EPISODELIST ? url.concat('/episodes') : url)
    .then(response => (response.ok ? response : throwError(response)))
    .then(response => response.json())
    .then((result) => {
      dispatch({
        type,
        result,
      });
    })
    .catch(error => dispatch(fetchShowsFailure(error)));
};

export const fetchShows = () => getData(FETCH_SHOWS_SUCCESS);
export const fetchShow = id => getData(SHOW, id);
export const fetchEpisodes = id => getData(EPISODELIST, id);
