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

let IconFail: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M313.700617 981.425035a509.585194 509.585194 0 1 1 483.124219-891.858149 511.093174 511.093174 0 0 1 184.584915 224.159204 508.851582 508.851582 0 0 1-46.976637 483.154786 511.811502 511.811502 0 0 1-137.613373 137.582806 510.267861 510.267861 0 0 1-483.124219 46.986825z m21.840239-887.22213A455.053373 455.053373 0 1 0 512 58.587065a452.144398 452.144398 0 0 0-176.459144 35.610746z m356.774845 654.397135l-180.310606-180.310607-180.300418 180.310607a39.808637 39.808637 0 0 1-56.279244-56.309811l180.28004-180.300418-180.28004-180.300418A39.793353 39.793353 0 0 1 331.704677 275.410149l180.300418 180.300418 180.310606-180.300418a39.793353 39.793353 0 0 1 56.269055 56.279244l-180.300418 180.300418 180.300418 180.300418a39.803542 39.803542 0 1 1-56.269055 56.309811z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconFail.defaultProps = {
  size: 18,
};

IconFail = React.memo ? React.memo(IconFail) : IconFail;

export default IconFail;
