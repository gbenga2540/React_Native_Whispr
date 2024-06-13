export class MessageCipher {
  // Helper function to get the character code of a character
  private getCharCode(char: string): number {
    return char.charCodeAt(0);
  }

  // Helper function to get the character from a character code
  private reverseCharCode(charCode: number): string {
    return String.fromCharCode(charCode);
  }

  // Helper function to check if a character is an ASCII or ANSI character
  private isASCIIOrANSIChar(char: string): boolean {
    const charCode = this.getCharCode(char);
    return charCode >= 32 && charCode <= 255;
  }

  // Auto generate Hash from the key
  private genHash(key: string): string {
    return key.slice(0, 3).split('').map(this.getCharCode).join('');
  }

  // Generate a key offset from the sender and receiver ids
  public generateCipherKey(sender_id: string, receiver_id: string): number {
    const rev_sender_id: string = sender_id.split('').reverse().join('');
    let key: string = '';
    let i: number = 0;

    while (i < rev_sender_id.length) {
      key += rev_sender_id[i] + receiver_id[i];
      i++;
    }

    // Append remaining characters from the longer ID
    key += rev_sender_id.slice(i) + receiver_id.slice(i);

    // Reverse the key
    key = key.split('').reverse().join('');

    let actualKey: string = '';
    const hash = this.genHash(key);

    for (let j = 0; j < Math.ceil(hash.length / 2); j++) {
      actualKey +=
        key[parseInt(hash[j], 10)] +
        key[Math.ceil(key.length / 2) + parseInt(hash[j + 2], 10)];
    }

    let offsetKey: number = 0;
    for (let k = 0; k < actualKey.length; k++) {
      offsetKey += this.getCharCode(actualKey[k]);
    }
    return offsetKey % 255;
  }

  // Cipher function
  public cipherMessage(message: string, secret_key: number): string {
    let cipheredMessage: string = '';

    for (let i = 0; i < message.length; i++) {
      const char = message[i];

      if (this.isASCIIOrANSIChar(char)) {
        const charCode = this.getCharCode(char);

        const newKey: number = charCode + secret_key;
        const hashed = `${Math.floor(newKey / 255)}${(newKey % 255).toString(
          16,
        )}`;
        cipheredMessage += hashed;
      } else {
        cipheredMessage += char;
      }
    }

    return cipheredMessage.split('').reverse().join('');
  }

  // Decipher function
  public decipherMessage(message: string, secret_key: number): string {
    const textMsg: string = message.split('').reverse().join('');
    let deciphered_message: string = '';

    let index: number = 0;

    while (index < textMsg.length) {
      if (this.isASCIIOrANSIChar(textMsg[index])) {
        const charToReverse = textMsg.substring(index, index + 3);
        let getCharDec = parseInt(charToReverse.substring(1, 3), 16);

        if (charToReverse[0] === '1') {
          getCharDec = getCharDec + 255;
        }

        const newCharCode = getCharDec - secret_key;
        deciphered_message += this.reverseCharCode(newCharCode);

        index += 3;
      } else {
        deciphered_message += textMsg[index];
        index++;
      }
    }

    return deciphered_message;
  }
}
