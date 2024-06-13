// Helper function to get the character code of a character
export const getCharCode = (char: string): number => char.charCodeAt(0);

// Helper function to get the character from a character code
export const reverseCharCode = (charCode: number): string =>
  String.fromCharCode(charCode);

// Helper function to check if a character is an ASCII or ANSI character
export const is_ASCII_or_ANSI_Char = (char: string): boolean => {
  const charCode = getCharCode(char);
  return charCode >= 32 && charCode <= 255;
};

// auto generate Hash from the key
export const genHash = (key: string): string =>
  key.slice(0, 3).split('').map(getCharCode).join('');
