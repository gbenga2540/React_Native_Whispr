import React, {
  useCallback,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { ViewStyle } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetProps } from './bottom-sheet.props';
import { useBlur } from 'src/context/blur/interfaces';
import { useCustomTheme } from 'src/context/theme/interfaces';

const BottomSheet = forwardRef(({ children }: BottomSheetProps, ref) => {
  const { setIsBlur } = useBlur();
  const { colors } = useCustomTheme();
  const sheetRef = useRef<BottomSheetModal | null>(null);

  const handlePresentModal = useCallback(() => {
    sheetRef.current?.present();
  }, []);

  const handleDismissModal = useCallback(() => {
    sheetRef.current?.dismiss();
  }, []);

  useImperativeHandle(ref, () => ({
    present: handlePresentModal,
    dismiss: handleDismissModal,
  }));

  const BOTTOM_SHEET: ViewStyle = {
    backgroundColor: colors.background,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  };

  const BG_STYLE: ViewStyle = {
    backgroundColor: colors.background,
    shadowColor: colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 9,
    elevation: 5,
  };

  const HANDLE_STYLE: ViewStyle = {
    backgroundColor: colors.inputPLText,
  };

  return (
    <BottomSheetModal
      backgroundStyle={BG_STYLE}
      handleIndicatorStyle={HANDLE_STYLE}
      style={BOTTOM_SHEET}
      ref={sheetRef}
      enablePanDownToClose
      enableDismissOnClose
      keyboardBehavior="interactive"
      onAnimate={() => setIsBlur(true)}
      onDismiss={() => setIsBlur(false)}
      index={0}
      snapPoints={['80%', '90%']}>
      {children}
    </BottomSheetModal>
  );
});

export { BottomSheet };
