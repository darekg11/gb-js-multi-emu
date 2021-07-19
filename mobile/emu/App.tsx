import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {useColorScheme} from 'react-native';
import setupNavigation from './src/navigation';
import {stylesService, translationService} from './src/services';

translationService.setup();

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  stylesService.setup(isDarkMode);
  return (
    <NativeBaseProvider>
      <NavigationContainer>{setupNavigation()}</NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
