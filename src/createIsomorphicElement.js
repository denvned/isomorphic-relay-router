import React from 'react';

import IsomorphicContainer from './IsomorphicContainer';

export default (Component, props) =>
    <IsomorphicContainer
        {...props}
        Component={Component}
    />;
