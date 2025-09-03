import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { 
  homeOutline,
  barChartOutline,
  analyticsOutline,
  notificationsOutline,
  personOutline
} from 'ionicons/icons';
import HomePage from './pages/HomePage';
import StrategyPage from './pages/StrategyPage';
import AnalysisPage from './pages/AnalysisPage';
import SignalsPage from './pages/SignalsPage';
import ProfilePage from './pages/ProfilePage';

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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <HomePage />
          </Route>
          <Route exact path="/strategy">
            <StrategyPage />
          </Route>
          <Route exact path="/analysis">
            <AnalysisPage />
          </Route>
          <Route exact path="/signals">
            <SignalsPage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={homeOutline} />
            <IonLabel>首页</IonLabel>
          </IonTabButton>
          <IonTabButton tab="strategy" href="/strategy">
            <IonIcon aria-hidden="true" icon={barChartOutline} />
            <IonLabel>策略</IonLabel>
          </IonTabButton>
          <IonTabButton tab="analysis" href="/analysis">
            <IonIcon aria-hidden="true" icon={analyticsOutline} />
            <IonLabel>分析</IonLabel>
          </IonTabButton>
          <IonTabButton tab="signals" href="/signals">
            <IonIcon aria-hidden="true" icon={notificationsOutline} />
            <IonLabel>信号</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href="/profile">
            <IonIcon aria-hidden="true" icon={personOutline} />
            <IonLabel>我的</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
