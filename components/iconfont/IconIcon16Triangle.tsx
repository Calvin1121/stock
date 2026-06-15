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

let IconIcon16Triangle: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M409.344 179.2a128.512 128.512 0 0 1 205.312 0l385.6 523.392a122.112 122.112 0 0 1-102.4 193.408H126.336a122.112 122.112 0 0 1-102.4-193.408z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconIcon16Triangle.defaultProps = {
  size: 18,
};

IconIcon16Triangle = React.memo ? React.memo(IconIcon16Triangle) : IconIcon16Triangle;

export default IconIcon16Triangle;
