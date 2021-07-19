import {
  Box,
  Container,
  Icon,
  Text,
  VStack,
  HStack,
  Pressable,
} from 'native-base';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcons from 'react-native-vector-icons/Feather';
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
  goToHomePage = () => {
    this.props.drawerProps.navigation.navigate(APP_PAGES.EMULATOR_PAGE);
  };

  goToSettingsPage = () => {
    this.props.drawerProps.navigation.navigate(APP_PAGES.SETTINGS_PAGE);
  };

  goToInfoPage = () => {
    this.props.drawerProps.navigation.navigate(APP_PAGES.INFO_PAGE);
  };

  loadRom = () => {};

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
    <Pressable onPress={onPress} borderWidth={0}>
      <HStack justifyContent="space-between">
        <Icon
          as={ICON_FAMILY_TO_ICON_MAP[iconFamily]}
          name={icon}
          size={10}
          color={stylesService.getTextPrimaryColor()}
        />
        <Text style={styles.buttonText}>{text}</Text>
      </HStack>
    </Pressable>
  );
  render() {
    return (
      <Container style={styles.content}>
        <Box style={styles.scrollableContent}>
          <View style={[styles.actionContainer, styles.mainActionsContainer]}>
            <VStack space={5}>
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
                translationService.translate(
                  APP_TRANSLATIONS.DRAWER.rom_restart,
                ),
                'MaterialCommunity',
                'restart',
                this.restartRom,
              )}
            </VStack>
          </View>
          <View style={styles.divider} />
          <View style={[styles.actionContainer, styles.mainActionsContainer]}>
            <VStack space={5}>
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
          </View>
        </Box>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'column',
    paddingBottom: 10,
    paddingTop: 10,
  },
  buttonText: {
    color: stylesService.getTextPrimaryColor(),
    letterSpacing: 0.5,
  },
  content: {
    backgroundColor: stylesService.getBackgroundColor(),
    maxWidth: '100%',
    flex: 1,
  },
  divider: {
    borderBottomColor: stylesService.getDividerColor(),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  mainActionsContainer: {
    flex: 1,
  },
  scrollableContent: {
    flexGrow: 1,
  },
});

export default Drawer;
