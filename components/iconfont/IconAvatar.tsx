/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps, SvgXml } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

const xml = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <clipPath id="clip-path">
      <circle id="蒙版" cx="32" cy="32" r="32" transform="translate(-64.137 0)" fill="#fff3d8"/>
    </clipPath>
    <linearGradient id="linear-gradient" x1="0.476" x2="0.476" y2="0.819" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#fff"/>
      <stop offset="1" stop-color="#4a7ace"/>
    </linearGradient>
  </defs>
  <g id="icon_60_用户默认头像_圆" data-name="icon/60/用户默认头像/圆" transform="translate(65 0)">
    <g id="用户" transform="translate(-0.401 0.401)">
      <g id="头像">
        <circle id="蒙版-2" data-name="蒙版" cx="32" cy="32" r="32" transform="translate(-64.599 -0.401)" fill="#d6e1f5"/>
        <g id="头像-2" data-name="头像" transform="translate(-0.462 -0.401)" clip-path="url(#clip-path)">
          <path id="形状结合" d="M0,29.5V13.077A3.207,3.207,0,0,0-2.019,10.1L-16.034,4.509V0H-26.3V4.489h-.023l-14.6,5.623A3.206,3.206,0,0,0-42.971,13.1V29.5Z" transform="translate(-10.903 42.33)" fill="#97b3e5"/>
          <path id="形状结合-2" data-name="形状结合" d="M-42.971,22.466H0V6.04A3.191,3.191,0,0,0-2.019,3.061L-9.7,0A18.336,18.336,0,0,1-21.486,3.866,18.442,18.442,0,0,1-33.167.09l-7.751,2.986a3.225,3.225,0,0,0-2.054,2.993v16.4Z" transform="translate(-10.903 49.367)" fill="url(#linear-gradient)"/>
        </g>
      </g>
      <circle id="椭圆形" cx="3.528" cy="3.528" r="3.528" transform="translate(-26.937 28.22)" fill="#82a3db"/>
      <circle id="椭圆形备份" cx="3.528" cy="3.528" r="3.528" transform="translate(-44.896 28.22)" fill="#82a3db"/>
      <path id="矩形" d="M0,0H17.958a0,0,0,0,1,0,0V17.317A8.979,8.979,0,0,1,8.979,26.3h0A8.979,8.979,0,0,1,0,17.317V0A0,0,0,0,1,0,0Z" transform="translate(-41.048 19.241)" fill="#b4cfff"/>
      <path id="路径_13" data-name="路径 13" d="M-10.575,11.336s2,2.515,6.718,1.676c0,0,.266,3.43,1.247,3.43S.66,12.785-.183,8c0,0-1.182-3.286-2.428-3.286,0,0-2.621-4.562-6.272-4.562S-20.743-1.3-21.362,4.717c0,0-2.571.406-1.969,6.619s2.762,5.106,2.762,5.106V11.336Z" transform="translate(-20.478 13.307)" fill="#3f6fc2"/>
    </g>
  </g>
</svg>
`

let IconAvatar: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <SvgXml xml={xml}  width={size} height={size} {...rest} />
  );
};

IconAvatar.defaultProps = {
  size: 18,
};

IconAvatar = React.memo ? React.memo(IconAvatar) : IconAvatar;

export default IconAvatar;
