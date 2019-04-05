import React from 'react';

export const showMessage = (isFetching, error) => (isFetching || error ? (<h2>{error ? error.toString() : 'loading..'}</h2>) : false);
export const stubImage = episode => (episode.image ? episode : Object.assign(episode, { image: { medium: 'http://placehold.it/250x140' } }));
