import React from 'react';

export default (isFetching, error) => (isFetching || error ? (<h2>{error ? error.toString() : 'loading..'}</h2>) : false);
