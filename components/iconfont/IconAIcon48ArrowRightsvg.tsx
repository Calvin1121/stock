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

let IconAIcon48ArrowRightsvg: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M297.386667 512l384-407.893333 46.613333 43.861333L385.28 512l342.613333 364.032-46.592 43.861333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconAIcon48ArrowRightsvg.defaultProps = {
  size: 18,
};

IconAIcon48ArrowRightsvg = React.memo ? React.memo(IconAIcon48ArrowRightsvg) : IconAIcon48ArrowRightsvg;

export default IconAIcon48ArrowRightsvg;
