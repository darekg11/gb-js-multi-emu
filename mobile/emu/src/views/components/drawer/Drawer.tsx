import {Divider, Icon, Text, VStack, HStack, Pressable} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {APP_TRANSLATIONS} from '../../../../locales';
import {APP_PAGES} from '../../../enums';
import {stylesService, translationService} from '../../../services';

interface IOwnProps {
  readonly drawerProps: DrawerContentComponentProps<DrawerContentOptions>;
}

const ICON_FAMILY_TO_ICON_MAP = {
  FontAwesome: FontAwesomeIcons,
  FontAwesome5: FontAwesome5Icons,
  AntDesign: AntDesignIcons,
  MaterialCommunity: MaterialCommunityIcons,
  Feather: FeatherIcons,
};

class Drawer extends React.PureComponent<IOwnProps> {
  chooseRom = async () => {
    try {
      const romPathInfo = await DocumentPicker.pick({
        type: ['*/*'],
      });
      return {
        uri: romPathInfo.uri,
        size: romPathInfo.size,
      };
    } catch (error) {}
  };

  goToHomePage = () => {
    this.props.drawerProps.navigation.navigate(APP_PAGES.EMULATOR_PAGE);
  };

  goToSettingsPage = () => {
    this.props.drawerProps.navigation.navigate(APP_PAGES.SETTINGS_PAGE);
  };

  goToInfoPage = () => {
    this.props.drawerProps.navigation.navigate(APP_PAGES.INFO_PAGE);
  };

  loadRom = async () => {
    const romPathInfo = await this.chooseRom();
    if (romPathInfo && romPathInfo.uri && romPathInfo.size) {
      const uri = romPathInfo.uri;
      // When using Hermes Engine, 'ascii' is actually returning binary data /shrug
      // DON'T upgrade react-native-fs without check if this works correctly after upgrade
      const romData = await RNFS.readFile(uri, 'ascii');
    }
  };

  restartRom = () => {};

  renderSingleItem = (
    text: string,
    iconFamily:
      | 'FontAwesome'
      | 'FontAwesome5'
      | 'AntDesign'
      | 'MaterialCommunity'
      | 'Feather',
    icon: string,
    onPress: () => void,
  ) => (
    <Pressable px={5} py={2} onPress={onPress} borderWidth={0}>
      <HStack space={7} alignItems="center">
        <Icon
          as={ICON_FAMILY_TO_ICON_MAP[iconFamily]}
          name={icon}
          size={8}
          color={stylesService.getTextPrimaryColor()}
        />
        <Text style={styles.buttonText}>{text}</Text>
      </HStack>
    </Pressable>
  );
  render() {
    return (
      <DrawerContentScrollView {...this.props} style={styles.content}>
        <VStack
          divider={
            <Divider backgroundColor={stylesService.getDividerColor()} />
          }
          space={7}>
          <VStack space={3}>
            {this.renderSingleItem(
              translationService.translate(APP_TRANSLATIONS.DRAWER.home),
              'FontAwesome5',
              'home',
              this.goToHomePage,
            )}
            {this.renderSingleItem(
              translationService.translate(APP_TRANSLATIONS.DRAWER.rom_load),
              'AntDesign',
              'folderopen',
              this.loadRom,
            )}
            {this.renderSingleItem(
              translationService.translate(APP_TRANSLATIONS.DRAWER.rom_restart),
              'MaterialCommunity',
              'restart',
              this.restartRom,
            )}
          </VStack>
          <VStack space={3}>
            {this.renderSingleItem(
              translationService.translate(APP_TRANSLATIONS.DRAWER.settings),
              'FontAwesome',
              'cogs',
              this.goToSettingsPage,
            )}
            {this.renderSingleItem(
              translationService.translate(APP_TRANSLATIONS.DRAWER.info),
              'Feather',
              'info',
              this.goToInfoPage,
            )}
          </VStack>
        </VStack>
      </DrawerContentScrollView>
    );
  }
}

const styles = StyleSheet.create({
  buttonText: {
    color: stylesService.getTextPrimaryColor(),
    letterSpacing: 0.5,
    fontWeight: '500',
  },
  content: {
    backgroundColor: stylesService.getBackgroundColor(),
  },
});

export default Drawer;
