# vrchat

[![vrchat - npm](https://img.shields.io/npm/v/vrchat.svg)](https://www.npmjs.com/package/vrchat)
[![Build And Lint](https://github.com/calmery/vrchat/actions/workflows/build-and-lint.yml/badge.svg?branch=develop)](https://github.com/calmery/vrchat/actions/workflows/build-and-lint.yml)
[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

Unofficial VRChat API Client 🤫

## ToDo

- [x] 2FA
- [ ] Type Definition
- [ ] Add Examples ([WIP: Next.js](https://github.com/calmery/vrchat/tree/feature/add-next.js-example))

## Installation

Notice: This npm package has been replaced by [vrchatapi/vrchatapi-javascript](https://github.com/vrchatapi/vrchatapi-javascript) since version 1.0.0.

```
$ npm i vrchat@0.2.0
```

## Usage

```ts
import { VRChat, VRChatTFAMethod } from "vrchat";

const main = async () => {
  const vrchat = new VRChat();

  const tfa = await vrchat.login(
    process.env.VRCHAT_USERNAME,
    process.env.VRCHAT_PASSWORD
  );

  if (tfa && tfa.includes(VRChatTFAMethod.TimeBasedOneTimePassword)) {
    await vrchat.verifyTfa(
      VRChatTFAMethod.TimeBasedOneTimePassword,
      process.env.VRCHAT_TFA_CODE
    );
  }

  console.log(vrchat.auth);
  console.log(vrchat.twoFactorAuth);

  // await vrchat.get("...");
};

main();
```

```ts
import { VRChatTFAMethod, login, verifyTfa } from "vrchat";

const main = async () => {
  let twoFactorAuth: string | undefined = undefined;

  const { auth, tfa } = await login(
    process.env.VRCHAT_USERNAME,
    process.env.VRCHAT_PASSWORD
  );

  if (tfa && tfa.includes(VRChatTFAMethod.TimeBasedOneTimePassword)) {
    const { twoFactorAuth: _twoFactorAuth } = await verifyTfa(
      auth,
      VRChatTFAMethod.TimeBasedOneTimePassword,
      process.env.VRCHAT_TFA_CODE
    );

    twoFactorAuth = _twoFactorAuth;
  }

  console.log(auth);
  console.log(twoFactorAuth);

  // await vrchat.get("...");
};

main();
```
