#!/usr/bin/env bash

set -ex
ionic capacitor build android --prod --no-open
pushd android
./gradlew --info assembleRelease
popd
mkdir -p ./dist
rm -f ./dist/gb-js-multi-emu-android-arm64-v8a-release.apk
rm -f ./dist/gb-js-multi-emu-android-armeabi-v7a-release.apk
rm -f ./dist/gb-js-multi-emu-android-x86-release.apk
rm -f ./dist/gb-js-multi-emu-android-x86_64-release.apk
cp ./android/app/build/outputs/apk/release/app-arm64-v8a-release.apk ./dist/gb-js-multi-emu-android-arm64-v8a-release.apk
cp ./android/app/build/outputs/apk/release/app-armeabi-v7a-release.apk ./dist/gb-js-multi-emu-android-armeabi-v7a-release.apk
cp ./android/app/build/outputs/apk/release/app-x86-release.apk ./dist/gb-js-multi-emu-android-x86-release.apk
cp ./android/app/build/outputs/apk/release/app-x86_64-release.apk ./dist/gb-js-multi-emu-android-x86_64-release.apk 
