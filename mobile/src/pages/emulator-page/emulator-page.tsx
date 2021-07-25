import { useContext } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonImg } from '@ionic/react';
import { LCD_WIDTH, LCD_HEIGHT } from "gb-js-multi-emu-core/dist/components/gpu/constants";
import { BUTTONS } from "gb-js-multi-emu-core/dist/components/joypad/types";
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
    const keyPressed = (button: BUTTONS) => {
        console.log("PRESS: %s", button);
        runner.buttonPressed(button);
    }
    const keyReleased = (button: BUTTONS) => {
        console.log("RELEASE: %s", button);
        runner.buttonReleased(button);
    }
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
                <div className="emulator-controls-container">
                    <div className="emulator-controls-child-wrapper">
                        <div className="emulator-single-arrow-row-wrapper">
                            <IonImg onTouchStart={() => keyPressed(BUTTONS.UP)} onTouchEnd={() => keyReleased(BUTTONS.UP)} className="emulator-arrow-button" src="/assets/arrow-up.png" ></IonImg>
                        </div>
                        <div className="emulator-mulitple-arrow-row-wrapper">
                            <IonImg onTouchStart={() => keyPressed(BUTTONS.LEFT)} onTouchEnd={() => keyReleased(BUTTONS.LEFT)} className="emulator-arrow-button" src="/assets/arrow-left.png" ></IonImg>
                            <IonImg onTouchStart={() => keyPressed(BUTTONS.RIGHT)} onTouchEnd={() => keyReleased(BUTTONS.RIGHT)} className="emulator-arrow-button" src="/assets/arrow-right.png" ></IonImg>
                        </div>
                        <div className="emulator-single-arrow-row-wrapper">
                            <IonImg onTouchStart={() => keyPressed(BUTTONS.DOWN)} onTouchEnd={() => keyReleased(BUTTONS.DOWN)} className="emulator-arrow-button" src="/assets/arrow-down.png" ></IonImg>
                        </div>
                    </div>
                    <div className="emulator-controls-child-wrapper">
                        <div className="emulator-action-buttons-row-wrapper">
                            <div onTouchStart={() => keyPressed(BUTTONS.B)} onTouchEnd={() => keyReleased(BUTTONS.B)} className="emulator-action-button"><p>B</p></div>
                            <div onTouchStart={() => keyPressed(BUTTONS.A)} onTouchEnd={() => keyReleased(BUTTONS.A)}  className="emulator-action-button"><p>A</p></div>
                        </div>
                        <div className="emulator-option-buttons-row-wrapper">
                            <div onTouchStart={() => keyPressed(BUTTONS.SELECT)} onTouchEnd={() => keyReleased(BUTTONS.SELECT)} className="emulator-option-button"><p>SELECT</p></div>
                            <div onTouchStart={() => keyPressed(BUTTONS.START)} onTouchEnd={() => keyReleased(BUTTONS.START)} className="emulator-option-button"><p>START</p></div>
                        </div>
                    </div>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default EmulatorPage;