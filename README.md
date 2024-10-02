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
| Expandable Bottom Sheet | <img src="/app/BottomSheet/DemoBottomSheet.gif" alt="Expandable Bottom Sheet" width="210"/> |
| Drag To Rearrange       | <img src="/app/DragToRearrange/DemoToRearrange.gif" alt="Drag To Rearrange" width="210"/>        |
| Swipeable Row       | <img src="/app/SwipeableRow/DemoSwipeableRow.gif" alt="Swipeable Row" width="210"/>        |
| Draggable Item       | <img src="/app/DraggableItem/DemoDraggableItem.gif" alt="Draggable Item" width="210"/>        |
| Floating Buttons       | <img src="/app/FloatingButtons/DemoFloatingButtons.gif" alt="Floating Buttons" width="210"/>        |
| FlatList Synced       | <img src="/app/FLatListSynced/DemoFlatListSynced.gif" alt="FlatList Synced" width="210"/>        |
| Star Rating       | <img src="/app/StarRating/DemoStarRating.gif" alt="Star Rating" width="210"/>        |
| Floating Reaction       | <img src="/app/FloatingReaction/DemoFloatingReaction.gif" alt="Floating Reaction" width="210"/>        |
| Circular Progress Bar      | <img src="/app/CircularProgressBar/DemoCircularProgressbar.gif" alt="Circular Progress Bar" width="210"/>        |
| Toast Message      | <img src="/app/ToastMessage/DemoToastMessage.gif" alt="Toast Message" width="210"/>        |
| FlatList Animated      | <img src="/app/FlatListAnimated/DemoFlatListAnimated.gif" alt="FlatList Animated" width="210"/>        |
| Linear Progress Bar      | <img src="/app/LinearProgressBar/DemoLinearProgressBar.gif" alt="Linear Progress Bar" width="210"/>        |
| Bar Chart Weekly      | <img src="/app/BarChartWeekly/DemoBarChartWeekly.gif" alt="Bar Chart Weekly" width="210"/>        |
| Counter Animated      | <img src="/app/CounterAnimated/DemoCounterAnimated.gif" alt="Counter Animated" width="210"/>        |

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
