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
    <linearGradient id="linear-gradient" x1="0.077" x2="1" y2="1" gradientUnits="objectBoundingBox">
      <stop offset="0" stop-color="#9687ff"/>
      <stop offset="1" stop-color="#4444ef"/>
    </linearGradient>
  </defs>
  <g id="icon_64_Credit_Ioan" data-name="icon/64/Credit Ioan" transform="translate(7 7)">
    <rect id="矩形_3371" data-name="矩形 3371" width="64" height="64" rx="20" transform="translate(-7 -7)" fill="url(#linear-gradient)"/>
    <g id="组_13" data-name="组 13" transform="translate(5.875 3.82)">
      <path id="联合_6" data-name="联合 6" d="M-637.2-349.891a.975.975,0,0,1-.68-.93v-8.7a.977.977,0,0,1,.977-.976h23.521a3.508,3.508,0,0,1,3.251,2.032l5.587-1.507c1.211-.277,3.388-.289,4.106,1.362a3.863,3.863,0,0,1-1.224,4.593c-1.952,1.6-11.987,7.834-15.046,8.325a11.6,11.6,0,0,1-1.547.095C-623.05-345.593-630.779-347.846-637.2-349.891Zm1.273-1.644c6.364,2.013,14.9,4.468,18.931,3.916,2.447-.392,12.119-6.284,14.1-7.9a1.924,1.924,0,0,0,.671-2.3c-.174-.4-1.293-.373-1.844-.247l-5.945,1.6a2.772,2.772,0,0,1-.737,1.315,4.643,4.643,0,0,1-3.047,1.092l-8.35.434-.051,0a.975.975,0,0,1-.974-.926.975.975,0,0,1,.924-1.025l8.414-.436a2.8,2.8,0,0,0,1.716-.534.9.9,0,0,0,.257-.7c0-1.218-1.272-1.292-1.526-1.3h-22.535Zm7.782-11.574a.977.977,0,0,1-.977-.977.977.977,0,0,1,.977-.977h21.875v-11.21a.976.976,0,0,1,.976-.977.977.977,0,0,1,.977.977v12.187a.977.977,0,0,1-.977.977Zm-4.57-4.57a.977.977,0,0,1-.977-.977v-12.188a.976.976,0,0,1,.977-.976h22.851a.976.976,0,0,1,.977.976v12.188a.977.977,0,0,1-.977.977Zm.977-1.953h20.9v-10.235h-20.9Zm6.808-5.117a3.646,3.646,0,0,1,3.642-3.642,3.646,3.646,0,0,1,3.642,3.642,3.646,3.646,0,0,1-3.642,3.642A3.646,3.646,0,0,1-624.926-374.75Zm1.952,0a1.691,1.691,0,0,0,1.69,1.689,1.691,1.691,0,0,0,1.689-1.689,1.691,1.691,0,0,0-1.689-1.689A1.691,1.691,0,0,0-622.974-374.75Z" transform="translate(638 386)" fill="#fff"/>
    </g>
  </g>
</svg>
`

let IconCreditLoan: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <SvgXml xml={xml}  width={size} height={size} {...rest} />
  );
};

IconCreditLoan.defaultProps = {
  size: 18,
};

IconCreditLoan = React.memo ? React.memo(IconCreditLoan) : IconCreditLoan;

export default IconCreditLoan;
