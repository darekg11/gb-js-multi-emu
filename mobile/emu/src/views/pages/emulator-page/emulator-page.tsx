import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import Canvas, {ImageData} from 'react-native-canvas';
import {ScrollView, StatusBar, useColorScheme, useWindowDimensions} from 'react-native';
import {stylesService} from '../../../services';

const EmulatorPage = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const dimensions = useWindowDimensions();
  const height = 

  const backgroundStyle = {
    backgroundColor: stylesService.getBackgroundColor(),
  };

  const handleCanvas = (canvas: Canvas) => {
    canvas.width = 200;
    canvas.height = 200;

    const context = canvas.getContext('2d');
    context.fillStyle = 'purple';
    context.fillRect(0, 0, 200, 200);

    context.getImageData(0, 0, 200, 200).then(imageData => {
      const data = Object.values(imageData.data);
      const length = Object.keys(data).length;
      for (let i = 0; i < length; i += 4) {
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
      }
      const imgData = new ImageData(canvas, data, 200, 200);
      context.putImageData(imgData, 0, 0);
    });
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Canvas ref={handleCanvas} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmulatorPage;
