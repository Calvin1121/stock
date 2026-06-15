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

let IconIcon42HomeDefault: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M741.180952 902.095238H282.819048A159.378286 159.378286 0 0 1 121.904762 744.594286V386.755048a84.675048 84.675048 0 0 1 34.596571-68.437334l249.392762-185.734095A176.054857 176.054857 0 0 1 512 97.52381a178.639238 178.639238 0 0 1 106.203429 35.059809l249.197714 185.734095A85.187048 85.187048 0 0 1 902.095238 386.755048V744.594286A159.378286 159.378286 0 0 1 741.180952 902.095238zM512 534.28419a95.085714 95.085714 0 0 1 95.841524 93.866667v111.469714a33.621333 33.621333 0 0 0 33.938286 33.231239 33.621333 33.621333 0 0 0 33.913904-33.231239v-111.469714A162.230857 162.230857 0 0 0 512 467.821714a162.206476 162.206476 0 0 0-163.693714 160.304762v111.469714a33.621333 33.621333 0 0 0 33.913904 33.231239 33.621333 33.621333 0 0 0 33.913905-33.231239v-111.469714A95.085714 95.085714 0 0 1 512 534.28419z"
        fill={getIconColor(color, 0, '#A5A5A5')}
      />
    </Svg>
  );
};

IconIcon42HomeDefault.defaultProps = {
  size: 18,
};

IconIcon42HomeDefault = React.memo ? React.memo(IconIcon42HomeDefault) : IconIcon42HomeDefault;

export default IconIcon42HomeDefault;
