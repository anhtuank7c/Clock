# ios Clock app clone

| Platform |                                     iOS                                    |                                     Android                                    |
|:--------:|:--------------------------------------------------------------------------:|:------------------------------------------------------------------------------:|
|   Demo   | ![iOS version](https://media.giphy.com/media/1iLp6mLO4heVV6j6/source.gif) | ![Android version](https://media.giphy.com/media/l3q2J3YaYcznHLLhe/source.gif) |
|   Video  |                                                                            | [Demo](https://www.youtube.com/watch?v=8SFb4ZL6SQc&feature=youtu.be)           |
## Clone project to your computer

Following these steps

```
git clone https://github.com/anhtuank7c/Clock.git
cd Clock
npm install
npm install --save-dev eslint-config-rallycoding
react-native run-ios (or react-native run-android)
```

## Instantly releasing App (Without App/Play Store)

Smarter app version management
[![the whole world in your hand](http://i.imgur.com/795Sx23.png)](https://www.youtube.com/watch?v=hXrqnfcW_Y8)

##### 1) [Setup Microsoft Code Push (Free service):](https://microsoft.github.io/code-push/)

You have to install `code-push-cli` before start (`npm install -g code-push-cli`)

```
    yarn add react-native-code-push (or npm install --save react-native-code-push)
    code-push app add clock-android (We will have 2 key Staging is for testing purposes, Production is for publish purposes)
    code-push app add clock-ios (We will have 2 key Staging is for testing purposes, Production is for publish purposes)
    react-native link (follow the command and enter key above)
```

##### 2) Setup code-push inside your react-native app:
[Solution for BUILD FAILED `CodePush.h` not found](https://github.com/Microsoft/react-native-code-push/issues/662#issuecomment-272901612)

```
//Example App.js

import CodePush from 'react-native-code-push';

class App extends Component {
    componentDidMount() {
        CodePush.sync({
            updateDialog: true,
            installMode: CodePush.InstallMode.IMMEDIATE
        });
    }

    render() {
        <View>
            <Text>Welcome to React Native Code Push</Text>
        </View>
    }
}

```

##### 3) Releasing app

2 options to release an app (mandatory and optional):

#### Important: By default, we releasing Staging app, then if everything OK, we promote to the Production (That why when you add new code-push app, we have 2 different key Staging/Production)

###### 3.1) Mandatory mode:

-  Update immediately. (No way to ignore this update)
-  Very useful in urgent case. (IE: security, payment etc...)

```
    code-push release-react clock-android android -m --description "This is a mandatory release for Android platform, in Staging environment"
    code-push release-react clock-ios ios -m --description "This is a mandatory release for iOS platform, in Staging environment"
```

###### 3.2) Optional mode:
- Client can install update later (not required).

```
    code-push release-react clock-android android --description "This is a optional release for Android platform and can be ignored by client, in Staging environment"
    code-push release-react clock-ios ios --description "This is a optional release for iOS platform and can be ignored by client, in Staging environment"
```

###### 3.3) Promote release to Production environment:

- If Staging release are fine (verify that staging/beta works as expected), do promote to Production environment
- If the release not works as expected, we can go to step 3.4 to rollback
- Why doing this?
    - Staging with staging key are for our development devices (testing purposes)
    - Production with production key are for public devices (published app to App/Play Store)

```
    code-push promote clock-android Staging Production
    code-push promote clock-ios Staging Production
```

###### 3.4) Rollback release:

Sometime we got bad release, then we can roll it back to previous one

```
    // This will rollback to previous Staging release
    code-push rollback clock-android Staging
    code-push rollback clock-ios Staging

    // This will rollback to previous Production release
    code-push rollback clock-android Production
    code-push rollback clock-android Production
```

After rollback, we can go to step 4 to view deployment histories

##### 4) View deployment histories:

Statistic board

```
    // Check Staging update history
    code-push deployment history clock-android Staging
    code-push deployment history clock-ios Staging

    // Check Production update history
    code-push deployment history clock-android Production
    code-push deployment history clock-ios Production
```
