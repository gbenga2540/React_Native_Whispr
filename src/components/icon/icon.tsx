import React from 'react';
import { ICONS, IconProps } from './types';
import { SvgProps } from 'react-native-svg';

export function Icon({
  name,
  size = 16,
  style,
  color,
  outline,
  ...props
}: IconProps) {
  const IconImpl = ICONS[name] as unknown as React.FC<SvgProps>;
  const iconColor = outline ? { stroke: color } : { fill: color };

  return IconImpl ? (
    <IconImpl
      width={size}
      height={size}
      {...iconColor}
      {...props}
      style={style}
    />
  ) : null;
}
