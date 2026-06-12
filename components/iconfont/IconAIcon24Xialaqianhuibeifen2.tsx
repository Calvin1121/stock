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

let IconAIcon24Xialaqianhuibeifen2: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1323 1024" width={size} height={size} {...rest}>
      <Path
        d="M794.485522 955.733442a163.010991 163.010991 0 0 1-265.300388 0L30.942039 257.801883A163.010991 163.010991 0 0 1 163.55148 0.081505h996.893718a163.010991 163.010991 0 0 1 132.364925 257.720378z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconAIcon24Xialaqianhuibeifen2.defaultProps = {
  size: 18,
};

IconAIcon24Xialaqianhuibeifen2 = React.memo ? React.memo(IconAIcon24Xialaqianhuibeifen2) : IconAIcon24Xialaqianhuibeifen2;

export default IconAIcon24Xialaqianhuibeifen2;
