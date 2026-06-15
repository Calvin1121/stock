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

let IconIcon32Plus: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M448 832v-256H192a64 64 0 0 1-64-64 64 64 0 0 1 64-64h256V192a64 64 0 0 1 64-64 64 64 0 0 1 64 64v256h256a64 64 0 0 1 64 64 64 64 0 0 1-64 64h-256v256a64 64 0 0 1-64 64 64 64 0 0 1-64-64z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconIcon32Plus.defaultProps = {
  size: 18,
};

IconIcon32Plus = React.memo ? React.memo(IconIcon32Plus) : IconIcon32Plus;

export default IconIcon32Plus;
