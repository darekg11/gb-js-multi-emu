import { useContext } from 'react';
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { useLocation } from 'react-router-dom';
import { 
  settingsSharp,
  settingsOutline,
  folderOpenOutline,
  folderOpenSharp,
  refreshSharp,
  refreshOutline,
  informationCircleSharp,
  informationCircleOutline,
  homeSharp,
  homeOutline
} from 'ionicons/icons';
import { EmulatorStateContext } from "../contexts/EmulatorStateContext";
import './Menu.css';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Emulator',
    url: '/page/Emulator',
    iosIcon: homeOutline,
    mdIcon: homeSharp
  },
  {
    title: 'Settings',
    url: '/page/Settings',
    iosIcon: settingsOutline,
    mdIcon: settingsSharp
  },
  {
    title: 'Info',
    url: '/page/info',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircleSharp
  }
];

interface IMenuProps {
  setGamebotStateContext: any
}

const Menu: React.FC<IMenuProps> = (props) => {
  const location = useLocation();
  // @ts-ignore
  const runner = window.globalThis.runner;
  const context = useContext(EmulatorStateContext);
  let romFilePicker: HTMLInputElement | null = null;

  const openRomPicker = () => {
    if (romFilePicker) {
      romFilePicker.click();
    }
  }

  const restartRom = () => {
    runner.resetRom();
  }

  const onRomFileSelected = (event: any) => {
    const romFile = (event && event.target && event.target.files && event.target.files[0]) || null;
    if (!romFile) {
      return;
    };

    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      if (event && event.target && event.target.result) {
          const romData = new Uint8Array(event.target.result as ArrayBuffer);
          runner.loadRom(romData);
          props.setGamebotStateContext({ romName: runner.getRomName() });
      }
    });
    reader.readAsArrayBuffer(romFile);
  }

  return (
    <IonMenu contentId="drawer_menu" type="overlay">
      <input id="rom_file_picker" accept=".gb,.bin" type="file" ref={(ref) => romFilePicker = ref} onChange={onRomFileSelected} />
      <IonContent>
        <IonList id="drawer_menu_app_actions_list">
          <IonListHeader>GB JS Multi Emu</IonListHeader>
          {context.romName && <IonNote>{context.romName}</IonNote>}
          <IonMenuToggle key={"app-action-load-rom"} autoHide={false}>
              <IonItem button={true} lines="none" detail={false} onClick={openRomPicker}>
                <IonIcon slot="start" ios={folderOpenOutline} md={folderOpenSharp} />
                <IonLabel>Load ROM</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle key={"app-action-restart-rom"} autoHide={false}>
              <IonItem button={true} lines="none" detail={false} onClick={restartRom}>
                <IonIcon slot="start" ios={refreshOutline} md={refreshSharp} />
                <IonLabel>Restart ROM</IonLabel>
              </IonItem>
            </IonMenuToggle>
        </IonList>
        <IonList id="drawer_menu_app_pages_list">
          {appPages.map((appPage) => {
            return (
              <IonMenuToggle key={`app-page-${appPage.title}`} autoHide={false}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
