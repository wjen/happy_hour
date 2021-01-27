import React from 'react';

const Loading = () => {
  return (
    <section className="container">
      <div className="text-center">
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </section>
  );
};

export default Loading;
