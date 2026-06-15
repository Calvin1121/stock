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

let IconAIcon36DanxuanSinglechoiceSelected: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M819.2 389.688889l-341.333333 344.177778-65.422223-65.422223-142.222222-139.377777 68.266667-68.266667 139.377778 139.377778 275.911111-275.911111z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
    </Svg>
  );
};

IconAIcon36DanxuanSinglechoiceSelected.defaultProps = {
  size: 18,
};

IconAIcon36DanxuanSinglechoiceSelected = React.memo ? React.memo(IconAIcon36DanxuanSinglechoiceSelected) : IconAIcon36DanxuanSinglechoiceSelected;

export default IconAIcon36DanxuanSinglechoiceSelected;
