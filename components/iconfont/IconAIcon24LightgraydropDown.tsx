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

let IconAIcon24LightgraydropDown: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M581.400225 713.459061a85.336889 85.336889 0 0 1-138.885787 0L181.682237 348.08917a85.336889 85.336889 0 0 1 69.421559-134.917621h521.877745a85.336889 85.336889 0 0 1 69.293554 134.917621z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconAIcon24LightgraydropDown.defaultProps = {
  size: 18,
};

IconAIcon24LightgraydropDown = React.memo ? React.memo(IconAIcon24LightgraydropDown) : IconAIcon24LightgraydropDown;

export default IconAIcon24LightgraydropDown;
