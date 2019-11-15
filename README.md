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

## Release a new version

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