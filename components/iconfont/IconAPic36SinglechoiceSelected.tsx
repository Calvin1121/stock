/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps, Path, Svg } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconAPic36SinglechoiceSelected: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M819.2 389.688889l-341.333333 344.177778-65.422223-65.422223-142.222222-139.377777 68.266667-68.266667 139.377778 139.377778 275.911111-275.911111z"
        fill='#ffffff'
      />
    </Svg>
  );
};

IconAPic36SinglechoiceSelected.defaultProps = {
  size: 18,
};

IconAPic36SinglechoiceSelected = React.memo ? React.memo(IconAPic36SinglechoiceSelected) : IconAPic36SinglechoiceSelected;

export default IconAPic36SinglechoiceSelected;
