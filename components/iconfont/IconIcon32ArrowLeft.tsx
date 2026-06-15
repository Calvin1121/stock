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

let IconIcon32ArrowLeft: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M692.792889 538.737778l-283.022222 293.973333a38.855111 38.855111 0 0 1-56.604445 0 42.666667 42.666667 0 0 1 0-58.766222l256.142222-266.097778L353.223111 241.777778a42.666667 42.666667 0 0 1 0-58.88 38.855111 38.855111 0 0 1 56.547556 0l283.022222 293.831111a47.616 47.616 0 0 1 0 62.008889z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconIcon32ArrowLeft.defaultProps = {
  size: 18,
};

IconIcon32ArrowLeft = React.memo ? React.memo(IconIcon32ArrowLeft) : IconIcon32ArrowLeft;

export default IconIcon32ArrowLeft;
