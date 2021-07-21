import { useState } from 'react';

import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { EmulatorStateContext, DEFAULT_STATE } from "./contexts/EmulatorStateContext";
import Menu from './components/Menu';
import EmulatorPage from "./pages/emulator-page";
import EmulatorRunner from "./runner";

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

// initialize emulator runner instance
const runner = new EmulatorRunner();
// @ts-ignore
window.globalThis.runner = runner;

const App: React.FC = () => {
  const [gameboyStateContext, setGamebotStateContext] = useState(DEFAULT_STATE);
  return (
    <EmulatorStateContext.Provider value={gameboyStateContext}>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu setGamebotStateContext={setGamebotStateContext}/>
            <IonRouterOutlet id="main">
              <Route path="/" exact={true}>
                <Redirect to="/page/Emulator" />
              </Route>
              <Route path="/page/Emulator" exact={true}>
                <EmulatorPage />
              </Route>
            </IonRouterOutlet>
          </IonSplitPane>
        </IonReactRouter>
      </IonApp>
    </EmulatorStateContext.Provider>
  );
};

export default App;
