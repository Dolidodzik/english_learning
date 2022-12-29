import React, { useState } from 'react';
import loading from './loading.mp4';

function Loading() {
  return (
    <div className="loading">
        <video autoPlay loop muted className="loadingvideo">
            <source src={loading} type="video/mp4" />
        </video>
        <h1>LOADING...</h1>
    </div>
  );
}

export default Loading;