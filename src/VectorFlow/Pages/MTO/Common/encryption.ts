import CryptoJS from 'crypto-js';

// The SECRET_KEY is used as the passphrase for AES key derivation.
const SECRET_PHRASE = process.env.REACT_APP_SECRET_KEY || 'mykey123';

export function encryptStorageData(data: any): string {
  const dataString = typeof data === 'object' ? JSON.stringify(data) : String(data);
  
  const encrypted = CryptoJS.AES.encrypt(dataString, SECRET_PHRASE);
  
  return encrypted.toString();
}


export function decryptStorageData(encryptedData: string | null): any | null {
  if (!encryptedData) return null;
  
  try {
    const decrypted = CryptoJS.AES.decrypt(encryptedData, SECRET_PHRASE);
    
    const originalText = decrypted.toString(CryptoJS.enc.Utf8);
    
    if (!originalText) {
        return null; 
    }

    try {
      return JSON.parse(originalText);
    } catch (e) {
      return originalText;
    }

  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}