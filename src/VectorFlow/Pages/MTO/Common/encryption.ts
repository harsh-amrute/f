import CryptoJS from "crypto-js";
 
const SECRET_PHRASE = process.env.REACT_APP_SECRET_KEY || "mykey123";
 
function stringifyData(value: any): string {
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}
 
export function encryptStorageData(data: any): string {
  try {
    const dataString = stringifyData(data);
 
    const encrypted = CryptoJS.AES.encrypt(dataString, SECRET_PHRASE);
    return encrypted.toString();
  } catch (err) {
    console.error("Encryption failed:", err);
    return "";
  }
}
 
export function decryptStorageData(encryptedData: string | null): any | null {
  if (!encryptedData || typeof encryptedData !== "string") return null;
 
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_PHRASE);
    const text = bytes.toString(CryptoJS.enc.Utf8);
 
    if (!text || text.trim() === "" || text === "[object Object]") {
      return null;
    }
 
    try {
      return JSON.parse(text);
    } catch {
      return text;
    }
  } catch (error) {
    console.error("Decryption failed:", error);
    return null;
  }
}