# Features React Native 
Welcome to Features React Native, a repository showcasing various features and components in a React Native  application.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/claudiuceaca/features-react-native.git

2. Install dependencies:
   ```bash
    cd features-react-native
    npm install
 
3. Install Android Studio and Dependencies:
 To set up the Android development environment, follow these steps:

    * Install [Android Studio](https://developer.android.com/studio/index.html) on your computer. During installation, ensure that you select the following components:
      - Android SDK
      - Android SDK Platform
      - Android Virtual Device
      - If not using Hyper-V: Performance (Intel ® HAXM) [(For AMD or Hyper-V, refer to these instructions)](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html).

    * Open Android Studio, click on `"More Actions,"` and select `"SDK Manager."` Within the `"SDK Platforms"` tab, ensure that `"Android SDK Platform 34"` is checked.

    * In the `"SDK Tools"` tab, ensure that `"Android SDK Build-Tools 34"` is selected.

    * Configure the `ANDROID_HOME` environment variable to point to your Android SDK location `(usually %LOCALAPPDATA%\Android\Sdk)`.

    * Add the platform-tools directory `(usually %LOCALAPPDATA%\Android\Sdk\platform-tools)` to your system's PATH environment variable.
     
     Ensure Expo Go is installed on your Android simulator to run the app.
   
     For iOS, you can use the simulator provided by Xcode directly.
   
     Alternatively, you can follow the [React Native Android setup guide](https://reactnative.dev/docs/environment-setup?guide=native) or [Expo setup guide for multiple environments](https://docs.expo.dev/get-started/set-up-your-environment/) for detailed instructions.

  
4. Run the app on iOS or Android:
     ```bash
     npx expo run:ios
     npx expo run:android

## Features:

| Feature Name            | Showcase                                                                                     |
|-------------------------|-------------------------------------------------------------------------------------------|
| Expandable Bottom Sheet | <img src="https://github.com/claudiuceaca/features-react-native/assets/110819428/55d2d8f4-b292-46d9-a476-8347442a984c" alt="Expandable Bottom Sheet" width="210"/> |
| Drag To Rearrange       | <img src="https://github.com/claudiuceaca/features-react-native/assets/110819428/065c63c2-e282-4042-a156-1030b38cf215" alt="Drag To Rearrange" width="210"/>        |
| Swipeable Row       | <img src="https://github.com/claudiuceaca/features-react-native/assets/110819428/87552836-ad0b-477f-9569-3d0aaddbf724" alt="Swipeable Row" width="210"/>        |
| Draggable Item       | <img src="https://github.com/claudiuceaca/features-react-native/assets/110819428/cb7451f0-8272-48ce-9591-4fe4395847bc" alt="Draggable Item" width="210"/>        |
| Floating Buttons       | <img src="https://github.com/claudiuceaca/features-react-native/assets/110819428/b0d79158-8daf-4744-b377-61a2ef1c546e" alt="Draggable Item" width="210"/>        |

## Folder Structure:
          /                                         
          ├── app/
          │   ├── FeatureName/
          │   │   ├── FeatureNameComponent.tsx
          │   │   └── index.tsx
          │   ├── ...
          │   ├── _layout.tsx
          │   └── index.tsx  
          ├── components/  
          ├── constants/          
          ├── .gitignore
          ├── package.json                  
          └── ...

## Contributing
Contributions are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.
