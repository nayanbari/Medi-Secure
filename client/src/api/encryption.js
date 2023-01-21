import CryptoJS from "crypto-js";

const encryptData = (text) => {
  const passphrase = "123";
  return CryptoJS.AES.encrypt(text, passphrase).toString();
};

const decryptData = (encData) => {
  const passphrase = "123";
  const bytes = CryptoJS.AES.decrypt(data, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
