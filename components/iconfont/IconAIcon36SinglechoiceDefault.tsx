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

let IconAIcon36SinglechoiceDefault: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 28.444444A483.555556 483.555556 0 0 0 170.069333 853.930667 483.555556 483.555556 0 1 0 853.930667 170.069333 480.398222 480.398222 0 0 0 512 28.444444m0-28.444444A512 512 0 1 1 0 512 512 512 0 0 1 512 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconAIcon36SinglechoiceDefault.defaultProps = {
  size: 18,
};

IconAIcon36SinglechoiceDefault = React.memo ? React.memo(IconAIcon36SinglechoiceDefault) : IconAIcon36SinglechoiceDefault;

export default IconAIcon36SinglechoiceDefault;
