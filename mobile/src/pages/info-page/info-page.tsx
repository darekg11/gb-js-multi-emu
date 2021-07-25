import { useContext } from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { EmulatorStateContext } from "../../contexts/EmulatorStateContext";
import './info-page.css';
import packageInfo from "../../../package.json";
import gitCommitInfo from "../../git_commit.json";


const InfoPage: React.FC = () => {
    const context = useContext(EmulatorStateContext);
    const commit = gitCommitInfo.commit;
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
                <div className="version-container">
                    <h2>Version: {packageInfo.version}</h2>
                    <h2 className="git-commit-label">Git Commit Hash: {commit}</h2>
                    <a href={`https://github.com/darekg11/gb-js-multi-emu/commit/${commit}`} target="_blank" rel="noopener noreferrer">GitHub Commit Link</a>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default InfoPage;