import { useContext } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { EmulatorStateContext } from "../../contexts/EmulatorStateContext";
import './settings-page.css';


const SettingsPage: React.FC = () => {
    const context = useContext(EmulatorStateContext);
    return (
        <IonPage id="drawer_menu">
            <IonHeader>
                <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton />
                </IonButtons>
                <IonTitle>{context.romName || "GB JS Multi Emu"}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
            </IonContent>
        </IonPage>
    )
}

export default SettingsPage;