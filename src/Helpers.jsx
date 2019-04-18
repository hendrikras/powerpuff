import React from 'react';

const wrapHeader = text => <h2>{text}</h2>;
const isError = error => (error ? error.toString() : 'loading..');
export const showMessage = (isFetching, error) => (
  isFetching || error
    ? wrapHeader(isError(error))
    : false
);

export const textTruncate = (text, length, ending) => (
  text && text.length > length
    ? text.substring(0, length - ending.length) + ending
    : text
);

export const arrayToObject = array => array.reduce((accumulator, item) => {
  accumulator[item.show.id] = item;
  return accumulator;
}, {});
