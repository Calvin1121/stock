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

let IconIcon82Plus: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M831.537951 469.39161H554.60839V192.462049A40.248195 40.248195 0 0 0 512 149.853659a40.248195 40.248195 0 0 0-42.60839 42.60839v276.929561H192.462049A40.248195 40.248195 0 0 0 149.853659 512a40.248195 40.248195 0 0 0 42.60839 42.60839h276.929561v276.929561A40.248195 40.248195 0 0 0 512 874.146341a40.248195 40.248195 0 0 0 42.60839-42.60839V554.60839h276.929561A40.248195 40.248195 0 0 0 874.146341 512a40.248195 40.248195 0 0 0-42.60839-42.60839z"
        fill={getIconColor(color, 0, '#A5A5A5')}
      />
    </Svg>
  );
};

IconIcon82Plus.defaultProps = {
  size: 18,
};

IconIcon82Plus = React.memo ? React.memo(IconIcon82Plus) : IconIcon82Plus;

export default IconIcon82Plus;
