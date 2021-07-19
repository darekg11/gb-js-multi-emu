import React from 'react';
import {StyleSheet} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {APP_PAGES} from '../enums';
import {Drawer} from '../views/components';
import {EmulatorPage, SettingsPage, InfoPage} from '../views/pages';
import {stylesService} from '../services';

const setupNavigation = () => {
  const AppDrawer = createDrawerNavigator();
  return (
    <AppDrawer.Navigator
      initialRouteName={APP_PAGES.EMULATOR_PAGE}
      drawerContent={props => <Drawer drawerProps={props} />}
      drawerStyle={styles.drawer}>
      <AppDrawer.Screen
        name={APP_PAGES.EMULATOR_PAGE}
        component={EmulatorPage}
      />
      <AppDrawer.Screen
        name={APP_PAGES.SETTINGS_PAGE}
        component={SettingsPage}
      />
      <AppDrawer.Screen name={APP_PAGES.INFO_PAGE} component={InfoPage} />
    </AppDrawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: {
    borderRightWidth: StyleSheet.hairlineWidth,
    borderRightColor: stylesService.getDividerColor(),
  },
});

export {setupNavigation};
