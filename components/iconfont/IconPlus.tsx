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

let IconPlus: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M441.72265598 863.52734375v-281.24999973h-281.24999973a70.31249972 70.31249972 0 0 1-70.31249973-70.31250055 70.31249972 70.31249972 0 0 1 70.31249973-70.3124997h281.24999973v-281.24999973a70.31249972 70.31249972 0 0 1 70.31250055-70.31250053 70.31249972 70.31249972 0 0 1 70.31249973 70.31250049v281.24999977h281.2499997a70.31249972 70.31249972 0 0 1 70.31250053 70.3124997 70.31249972 70.31249972 0 0 1-70.31250049 70.31250055h-281.24999977v281.24999973a70.31249972 70.31249972 0 0 1-70.3124997 70.31249973 70.31249972 70.31249972 0 0 1-70.31250055-70.31249973z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconPlus.defaultProps = {
  size: 18,
};

IconPlus = React.memo ? React.memo(IconPlus) : IconPlus;

export default IconPlus;
