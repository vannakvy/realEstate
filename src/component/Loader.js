import React from 'react';

const Loader = () => {
 return (
  <span>
   <span
    className="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
   ></span>{' '}
   Loading...
  </span>
 );
};

export default Loader;
