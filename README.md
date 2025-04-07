<h1 align="center">
  Hermes Profile Transformer
</h1>

This is a fork of the original `react-native-community/hermes-profile-transformer` package.
The motivation behind this is to make it possible to run it on the web, since the original one was ran on Node.

## How

- Dynamically loads `source-map` depending on where it's running: When running on web, it will be loaded by a script, otherwise it lazy imports the module.
- Removes any direct Node dependencies that made it incompatible. That is file system integration. Instead of receiving a file path for the profile and source map, it will receive the actual data, so it's agnostic to how that was loaded.

<!-- <p align="center">
<img alt="npm" src="https://img.shields.io/npm/v/hermes-profile-transformer">
<img alt="node-current" src="https://img.shields.io/node/v/hermes-profile-transformer">
<img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/hermes-profile-transformer">
<img alt="NPM" src="https://img.shields.io/npm/l/hermes-profile-transformer">
<img alt="npm type definitions" src="https://img.shields.io/npm/types/hermes-profile-transformer">
</p> -->

Visualize Facebook's [Hermes JavaScript runtime](https://github.com/facebook/hermes) profile traces in Chrome Developer Tools.

![Demo Profile](https://raw.githubusercontent.com/react-native-community/hermes-profile-transformer/master/assets/convertedProfile.png)

## Overview

The Hermes runtime, used by React Native for Android, is able to output [Chrome Trace Events](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview) in JSON Object Format.

This TypeScript package converts Hermes CPU profiles to Chrome Developer Tools compatible JSON Array Format, and enriches it with line and column numbers and event categories from JavaScript source maps.

## Usage

### As a standalone package

```ts
import transformer from '@winterdouglas/hermes-profile-transformer';

const sourceMapBundleFileName = 'index.bundle.js';

try {
  const events = transformer(
    // profile data is required
    hermesCpuProfile,
    // source maps are optional
    sourceMap,
    sourceMapBundleFileName
  );

  // Do something with the converted trace
  console.log(JSON.stringify(events, null, 2));
} catch (err) {
  console.log(err);
}
```

## Creating Hermes CPU Profiles

## Opening converted profiles in Chrome Developer Tools

Open Developer Tools in Chrome, navigate to the **Performance** tab, and use the **Load profile...** feature.

![Loading the Profile](https://raw.githubusercontent.com/react-native-community/hermes-profile-transformer/master/assets/loading.png)

## API

### transformer(hermesProfile: HermesCPUProfile, sourceMap?: SourceMap, bundleFileName?: string)

#### Parameters

| Parameter      | Type             | Required | Description                                                                                                                                                               |
| -------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hermesProfile  | HermesCPUProfile | Yes      | JSON-formatted `.cpuprofile` file created by the Hermes runtime                                                                                                           |
| sourceMap      | SourceMap        | No       | JSON-formatted [source-map](https://www.npmjs.com/package/source-map) compatible Source Map file                                                                          |
| bundleFileName | string           | No       | If `sourceMapPath` is provided, you need to also provide the name of the JavaScript bundle file that the source map applies to. This file does not need to exist on disk. |

#### Returns

`Promise<DurationEvent[]>`, where `DurationEvent` is as defined in [EventInterfaces.ts](src/types/EventInterfaces.ts).

## Resources

- [Using Hermes with React Native](https://reactnative.dev/docs/hermes).
- [Chrome Trace Event Format](https://docs.google.com/document/d/1CvAClvFfyA5R-PhYUmn5OOQtYMH4h6I0nSsKchNAySU/preview). Hermes uses the JSON Object format.
- [Measuring JavaScript performance in Chrome](https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/reference)

## LICENSE

[MIT](LICENSE)
