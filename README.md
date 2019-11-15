# Motivation

Wanted to have some fun with React Native and WebStockets

# Idea

> Whatever you do, it affects the people around you.

So, when any user taps the screen, a new random color is generated (in the back-end) and then it's broadcasted to all connected clients (apps), then in turn every client shows the same color on its screen.

# Technology used

- React Native
- CodePush (over the air updates)
- Node
- Websockets

# Roadmap

- [] Add Redux
- [] ?

# Useful CLI commands

## Release a new version through CodePush

```bash
react-native bundle --platform ios \
--entry-file index.js \
--bundle-output ./CodePush/main.jsbundle \
--assets-dest ./CodePush \
--dev false
```

```bash
code-push release Colorful-iOS ./CodePush 0.0.1
```

## Bundle debug APK
```bash
react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

# execute command to run android to create debug apk
```bash
react-native run-android
```

# build debug apk
```bash
cd android && ./gradlew assembleDebug
```