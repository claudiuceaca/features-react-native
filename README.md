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

     Alternatively, you can follow the [React Native Android setup guide](https://reactnative.dev/docs/environment-setup?guide=native) or [Expo setup guide for multiple environments](https://docs.expo.dev/get-started/set-up-your-environment/) for detailed instructions.

  
4. Run the app on iOS or Android:
     ```bash
     npx expo run:ios
     npx expo run:android

## Features:
 -  Expandable Bottom Sheet
 <img src="https://github.com/claudiuceaca/features-react-native/assets/110819428/4253d64b-6906-4990-9d2b-3756c3d3f906" alt="BasicShop" width="210"/>  

## Folder Structure:
          /                                         
          ├── app/
          │   │ _layout.tsx  
          │   │ index.tsx 
          │   └── ...           
          ├── components/            
          ├── .gitignore
          ├── package.json                  
          └── ...

## Contributing
Contributions are welcome! If you find any bugs or have suggestions for new features, please open an issue or submit a pull request.
