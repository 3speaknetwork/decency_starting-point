const generate_token = (length: number) => {
  //edit the token allowed characters
  var a =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[+j];
  }
  return b.join("");
};

export const login = async (username: string) => {
  return new Promise((res, rej) => {
    // @ts-ignore
    if (window.hive_keychain) {
      const buf = JSON.stringify(
        {
          token: generate_token(16),
        },
        null,
        0
      );

      // @ts-ignore
      window.hive_keychain.requestSignBuffer(
        username,
        buf,
        "Posting",
        (response: any) => {
          res(response);
        }
      );
    } else {
      rej("Hive keychain needs to be present");
    }
  });
};

export const validURL = (str: string) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
};