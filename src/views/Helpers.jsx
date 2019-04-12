import React from 'react';

export const showMessage = (isFetching, error) => (isFetching || error ? (<h2>{error ? error.toString() : 'loading..'}</h2>) : false);
export const stubImage = (item, height, width) => (item.image ? item : Object.assign(item, { image: { medium: `http://placehold.it/${height}x${width}` } }));
export const textTruncate = (text, length, ending) => (text && text.length > length
  ? text.substring(0, length - ending.length) + ending
  : text);
