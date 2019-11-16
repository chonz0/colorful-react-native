# Motivation

Wanted to have some fun with React Native and WebSockets

# Idea

> Whatever you do, it affects the people around you.

So, when any user taps the screen, a new random color is generated (in the back-end) and then it's broadcasted to all connected clients (apps), then in turn every client shows the same color on its screen.

# Technology used

- React Native
- CodePush
- Node + Express
- WebSockets

# Roadmap

- [ ] Add Redux
- [ ] Split into components
- [ ] Use Socket.io
- [ ] Use Fastify?
- [ ] ?

# Useful CLI commands

## Release a new version through CodePush

```bash
yarn codepush
```

## Bundle debug APK
```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

# Build debug apk
```bash
cd android && ./gradlew assembleDebug && cd ..
```