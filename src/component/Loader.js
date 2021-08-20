import React from 'react';

const Loader = () => {
 return (
  <span className="fw-bold">
   <span
    className="spinner-border spinner-border-sm"
    role="status"
    aria-hidden="true"
   ></span>{' '}
   កំពុងដំណើរការ...
  </span>
 );
};

export default Loader;
