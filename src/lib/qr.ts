import qrcode from "qrcode";

export const getQr = async (value: string): Promise<string> => {
  return new Promise((res, rej) => {
    try {
      qrcode.toDataURL(value, (err, url) => {
        if (err) return res("");
        return res(url);
      });
    } catch {
      return "";
    }
  });
};
