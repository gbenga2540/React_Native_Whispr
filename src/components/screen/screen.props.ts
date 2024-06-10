import React from 'react';
import {
  RefreshControlProps,
  StatusBarProps,
  ViewStyle,
  ScrollView,
} from 'react-native';
import { KeyboardOffsets, ScreenPresets } from './screen.presets';

export interface ScreenProps extends Partial<ViewStyle> {
  /**
   * Children components.
   */
  children?: React.ReactNode;

  /**
   * Header component
   */
  header?: React.ReactNode;

  /**
   * One of the different types of presets.
   */
  preset?: ScreenPresets;

  /**
   * An optional background color
   */
  backgroundColor?: string;

  /**
   * An optional status bar setting. Defaults to light-content.
   */
  statusBar?: 'light-content' | 'dark-content';

  /**
   * Should we not wrap in SafeAreaView? Defaults to false.
   */
  unsafe?: boolean;

  /**
   * By how much should we offset the keyboard? Defaults to none.
   */
  keyboardOffset?: KeyboardOffsets;

  /**
   * Should keyboard persist on screen tap. Defaults to handled.
   * Only applies to scroll preset.
   */
  keyboardShouldPersistTaps?: 'handled' | 'always' | 'never';

  /**
   * An optional status bar prop for over-riding status bar styles
   */
  statusBarProps?: StatusBarProps;

  /** this is the id find an element
   * React reference to the scroll view - useful for scrolling to positions
   */
  innerRef?: React.MutableRefObject<ScrollView | null>;

  /**
   * this is the id find an element
   */
  testID?: string;

  /**
   * RefreshControl component for the screen
   */
  refreshControl?: React.ReactElement<RefreshControlProps>;

  /**
   * Basically a value to add a margin at the base especially for scrolls to prevent content clipping
   */
  baseAllowance?: number;
}
