export const getRecaptchaToken = (): Promise<string> => new Promise((resolve, reject) => {
  window.grecaptcha.execute(
    process.env.REACT_APP_GOOGLE_RE_CAPTCHA_CLIENT_SITE_KEY || '',
    { action: "homepage" }
  ).then(token => {
    if (token) {
      resolve(token);
    } else {
      reject(token);
    }
  });
});
