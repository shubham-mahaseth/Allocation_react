import CryptoJS from 'crypto-js';

const secretKey = CryptoJS.enc.Utf8.parse("Allocation_Encrpytion_Proxima360");  // Keep this safe and use the same key in Django

export const encryptPassword = (plainText) => {
    const encrypted = CryptoJS.AES.encrypt(plainText, secretKey, {
      mode: CryptoJS.mode.ECB, // Use ECB mode for consistency
      padding: CryptoJS.pad.Pkcs7, // Default padding (PKCS7)
    });
    return encrypted.toString();  // Output is base64 encoded
  };