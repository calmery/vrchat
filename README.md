# VRChat JS

[![CircleCI](https://circleci.com/gh/calmery/VRChatJS/tree/master.svg?style=svg)](https://circleci.com/gh/calmery/VRChatJS/tree/master)

## Usage

See [VRChat API Documentation](https://vrchatapi.github.io)

```javascript
const { VRChat } = require("vrchat");
const vrchat = new VRChat();

(async () => {
  await vrchat.login(process.env.VRCHAT_USERNAME, process.env.VRCHAT_PASSWORD);
  const { data: onlineFriends } = await vrchat.get("auth/user/friends", {
    offline: false
  });

  onlineFriends.forEach(({ displayName }) => console.log(displayName));
})();
```
