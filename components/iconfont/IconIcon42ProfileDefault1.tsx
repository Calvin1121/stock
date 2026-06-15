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

let IconIcon42ProfileDefault1: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M658.773333 586.849524l177.517715 201.581714a67.364571 67.364571 0 0 1 10.581333 73.581714 70.851048 70.851048 0 0 1-64.268191 40.057905h-541.257142a70.875429 70.875429 0 0 1-64.268191-40.082286 67.388952 67.388952 0 0 1 10.581333-73.557333l177.566477-201.581714a289.913905 289.913905 0 0 0 293.473523 0zM512 121.904762a229.546667 229.546667 0 1 1-235.76381 229.473524A232.667429 232.667429 0 0 1 512 121.904762z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconIcon42ProfileDefault1.defaultProps = {
  size: 18,
};

IconIcon42ProfileDefault1 = React.memo ? React.memo(IconIcon42ProfileDefault1) : IconIcon42ProfileDefault1;

export default IconIcon42ProfileDefault1;
