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

let IconAIcon48CollectionSelectedsvg: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M321.130667 121.6a226.88 226.88 0 0 1 105.408 26.389333 247.786667 247.786667 0 0 1 78.293333 65.621334A234.325333 234.325333 0 0 1 688.448 121.6c133.546667 0 242.197333 118.528 242.197333 264.192 0 87.274667-40.106667 149.952-69.397333 195.712-90.901333 141.738667-316.565333 316.181333-322.389333 320.597333a54.592 54.592 0 0 1-68.138667 0c-2.816-2.133333-61.333333-47.125333-131.221333-110.293333a1121.792 1121.792 0 0 1-191.168-210.325333C119.061333 535.744 78.933333 473.066667 78.933333 385.770667 78.933333 240.128 187.584 121.6 321.130667 121.6z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconAIcon48CollectionSelectedsvg.defaultProps = {
  size: 18,
};

IconAIcon48CollectionSelectedsvg = React.memo ? React.memo(IconAIcon48CollectionSelectedsvg) : IconAIcon48CollectionSelectedsvg;

export default IconAIcon48CollectionSelectedsvg;
