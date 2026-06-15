/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconIcon48Close: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M560.213333 532.138667L843.264 250.453333a34.176 34.176 0 0 0-48.149333-48.512L512 483.754667 231.381333 202.090667a34.133333 34.133333 0 1 0-48.32 48.234666l280.533334 281.6L180.736 813.546667a34.133333 34.133333 0 0 0-0.149333 48.32 34.133333 34.133333 0 0 0 48.298666 0.128L511.829333 580.266667l283.178667 284.309333a34.133333 34.133333 0 0 0 48.256 0.128 34.133333 34.133333 0 0 0 0-48.32L560.213333 532.138667z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconIcon48Close.defaultProps = {
  size: 18,
};

IconIcon48Close = React.memo ? React.memo(IconIcon48Close) : IconIcon48Close;

export default IconIcon48Close;
