export const SHOW_REQUESTED = 'SHOW_REQUESTED';
export const SHOW = 'SHOW';

const initialState = {
  show: { summary: 'pending' },
  ids: [6771, 4898, 27896],
  isFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_REQUESTED:
      return {
        ...state,
        isFetching: true,
      };

    case SHOW:
      return {
        ...state,
        show: action.result,
        isFetching: !state.isFetching,
      };

    default:
      return state;
  }
};

export const fetchShow = id => (dispatch) => {
  dispatch({
    type: SHOW_REQUESTED,
  });

  fetch('http://api.tvmaze.com/shows/'.concat(id))
    .then(response => response.json())
    .then((result) => {
      dispatch({
        type: SHOW,
        result,
      });
    });
};

export const fetchEpisodes = () => (dispatch) => {
  dispatch({
    type: SHOW_REQUESTED,
  });

  fetch('http://api.tvmaze.com/shows/6771')
    .then(response => response.json())
    .then((result) => {
      dispatch({
        type: SHOW,
        result,
      });
    });
};
