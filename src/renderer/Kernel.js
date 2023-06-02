import React from 'react';
import Navigation from 'renderer/Navigation';
import useBootstrap from 'renderer/hooks/useBootstrap';

function Kernel() {
  useBootstrap();
  return (
    <div>
      <Navigation />
    </div>
  );
}

export default Kernel;
