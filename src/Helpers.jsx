import React from 'react';

const wrapHeader = text => <h2>{text}</h2>;
const isError = error => (error ? error.toString() : 'loading..');
export const showMessage = (isFetching, error) => (
  isFetching || error
    ? wrapHeader(isError(error))
    : false
);
const stubSomething = (item, name, replaceItem) => (
  item[name]
    ? item
    : Object.assign(item, { [name]: replaceItem })
);

export const stubSummary = item => stubSomething(item, 'summary', `There is no description available for ${item.name}`);
export const stubImage = (item, height, width) => stubSomething(stubSummary(item), 'image', { medium: `https://placehold.it/${height}x${width}/db7093/FFF?text=${item.name}` });

export const textTruncate = (text, length, ending) => (
  text && text.length > length
    ? text.substring(0, length - ending.length) + ending
    : text
);
