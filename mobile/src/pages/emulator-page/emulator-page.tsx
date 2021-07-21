import { useContext } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { LCD_WIDTH, LCD_HEIGHT } from "gb-js-multi-emu-core/dist/components/gpu/constants";
import { EmulatorStateContext } from "../../contexts/EmulatorStateContext";
import './emulator-page.css';


const EmulatorPage: React.FC = () => {
    const calculateScaleFactor = () => {
        const deviceWidth = window.innerWidth;
        return Math.floor(deviceWidth / LCD_WIDTH);
    }
    const scaleFactor = calculateScaleFactor();
    // @ts-ignore
    const runner = window.globalThis.runner;
    runner.changeScaleFactor(scaleFactor);
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
                <div className="emulator-container">
                    <canvas className="emulator-window" id="emulator_window" width={scaleFactor * LCD_WIDTH} height={scaleFactor * LCD_HEIGHT}></canvas>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default EmulatorPage;