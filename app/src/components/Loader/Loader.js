import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const DefaultLoader = ({
  type, color, height, width,
}) => (
  <div className="loader loader--fullscreen loader--middle">
    <Loader
      type={type}
      color={color}
      height={height}
      width={width}
    />
  </div>
);

DefaultLoader.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

DefaultLoader.defaultProps = {
  type: 'ThreeDots',
  color: '#fff',
  height: 200,
  width: 200,
};


export default DefaultLoader;
