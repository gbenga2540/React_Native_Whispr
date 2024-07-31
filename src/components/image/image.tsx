import React from 'react';
import {
  Image as DefaultImage,
  ImageStyle,
  ImageURISource,
} from 'react-native';
import { ImageProps } from './image.props';

export function Image({ sourceFile, ...props }: ImageProps): React.JSX.Element {
  const IMAGE: ImageStyle = {
    ...props,
  };

  return (
    <DefaultImage
      style={IMAGE}
      source={
        (sourceFile as ImageURISource)?.uri
          ? ({
              uri: (sourceFile as ImageURISource).uri,
              ...(sourceFile as ImageURISource),
              width: props.width,
              height: props.height,
            } as ImageURISource)
          : sourceFile
      }
    />
  );
}
