export const SHOW_REQUESTED = 'SHOW_REQUESTED';
export const EPISODES_REQUESTED = 'EPISODES_REQUESTED';
export const SHOW = 'SHOW';
export const EPISODELIST = 'EPISODELIST';

const initialState = {
  show: {},
  episodeList: [],
  ids: [6771, 4898, 27896],
  names: { 6771: 'PowerPuff Girls', 4898: 'Kenny StarFighter', 27896: 'Yorkshire wolds' },
  isFetching: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
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

const getData = (id, episodes) => (dispatch) => {
  dispatch({
    type: SHOW_REQUESTED,
  });
  const url = `http://api.tvmaze.com/shows/${id}`;
  const type = episodes ? EPISODELIST : SHOW;
  fetch(episodes ? url.concat('/episodes') : url)
    .then(response => response.json())
    .then((result) => {
      dispatch({
        type,
        result,
      });
    });
};

export const fetchShow = id => getData(id, false);
export const fetchEpisodes = id => getData(id, true);
