import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonAlert,
  IonToast,
} from '@ionic/react';
import { 
  settingsOutline, 
  notificationsOutline, 
  colorPaletteOutline,
  languageOutline,
  saveOutline,
  refreshOutline,
  informationCircleOutline
} from 'ionicons/icons';
import './Tab3.css';

interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'zh-CN' | 'en-US';
  notifications: boolean;
  autoRefresh: boolean;
  refreshInterval: number;
  apiBaseUrl: string;
  debugMode: boolean;
}

const Tab3: React.FC = () => {
  const [settings, setSettings] = useState<AppSettings>({
    theme: 'auto',
    language: 'zh-CN',
    notifications: true,
    autoRefresh: true,
    refreshInterval: 30,
    apiBaseUrl: 'http://localhost:8000',
    debugMode: false,
  });

  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSettingChange = (key: keyof AppSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    // 这里可以保存设置到本地存储或后端
    localStorage.setItem('crypto-trading-settings', JSON.stringify(settings));
    setToastMessage('设置已保存');
    setShowToast(true);
  };

  const handleResetSettings = () => {
    const defaultSettings: AppSettings = {
      theme: 'auto',
      language: 'zh-CN',
      notifications: true,
      autoRefresh: true,
      refreshInterval: 30,
      apiBaseUrl: 'http://localhost:8000',
      debugMode: false,
    };
    setSettings(defaultSettings);
    setToastMessage('设置已重置');
    setShowToast(true);
  };

  const handleTestConnection = async () => {
    try {
      const response = await fetch(`${settings.apiBaseUrl}/api/v1/health`);
      if (response.ok) {
        setToastMessage('连接测试成功');
      } else {
        setToastMessage('连接测试失败');
      }
    } catch (error) {
      setToastMessage('连接测试失败');
    }
    setShowToast(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>设置</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">设置</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* 外观设置 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={colorPaletteOutline} />
              外观设置
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>主题模式</IonLabel>
                <IonSelect
                  value={settings.theme}
                  onIonChange={(e) => handleSettingChange('theme', e.detail.value)}
                >
                  <IonSelectOption value="light">浅色模式</IonSelectOption>
                  <IonSelectOption value="dark">深色模式</IonSelectOption>
                  <IonSelectOption value="auto">跟随系统</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel>语言</IonLabel>
                <IonSelect
                  value={settings.language}
                  onIonChange={(e) => handleSettingChange('language', e.detail.value)}
                >
                  <IonSelectOption value="zh-CN">简体中文</IonSelectOption>
                  <IonSelectOption value="en-US">English</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* 通知设置 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={notificationsOutline} />
              通知设置
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>启用通知</IonLabel>
                <IonToggle
                  checked={settings.notifications}
                  onIonChange={(e) => handleSettingChange('notifications', e.detail.checked)}
                />
              </IonItem>
              <IonItem>
                <IonLabel>自动刷新</IonLabel>
                <IonToggle
                  checked={settings.autoRefresh}
                  onIonChange={(e) => handleSettingChange('autoRefresh', e.detail.checked)}
                />
              </IonItem>
              {settings.autoRefresh && (
                <IonItem>
                  <IonLabel>刷新间隔 (秒)</IonLabel>
                  <IonSelect
                    value={settings.refreshInterval}
                    onIonChange={(e) => handleSettingChange('refreshInterval', e.detail.value)}
                  >
                    <IonSelectOption value={10}>10秒</IonSelectOption>
                    <IonSelectOption value={30}>30秒</IonSelectOption>
                    <IonSelectOption value={60}>1分钟</IonSelectOption>
                    <IonSelectOption value={300}>5分钟</IonSelectOption>
                  </IonSelect>
                </IonItem>
              )}
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* API设置 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={informationCircleOutline} />
              API设置
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel position="stacked">API基础URL</IonLabel>
                <IonInput
                  value={settings.apiBaseUrl}
                  onIonChange={(e) => handleSettingChange('apiBaseUrl', e.detail.value)}
                  placeholder="http://localhost:8000"
                />
              </IonItem>
              <IonItem>
                <IonLabel>调试模式</IonLabel>
                <IonToggle
                  checked={settings.debugMode}
                  onIonChange={(e) => handleSettingChange('debugMode', e.detail.checked)}
                />
              </IonItem>
            </IonList>
            <IonButton 
              expand="block" 
              fill="outline" 
              onClick={handleTestConnection}
              className="test-connection-btn"
            >
              <IonIcon icon={refreshOutline} slot="start" />
              测试连接
            </IonButton>
          </IonCardContent>
        </IonCard>

        {/* 操作按钮 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={settingsOutline} />
              操作
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonButton 
                    expand="block" 
                    color="success"
                    onClick={handleSaveSettings}
                  >
                    <IonIcon icon={saveOutline} slot="start" />
                    保存设置
                  </IonButton>
                </IonCol>
                <IonCol size="6">
                  <IonButton 
                    expand="block" 
                    fill="outline"
                    color="warning"
                    onClick={handleResetSettings}
                  >
                    <IonIcon icon={refreshOutline} slot="start" />
                    重置设置
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* 关于信息 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={informationCircleOutline} />
              关于
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>
                  <h2>应用名称</h2>
                  <p>加密货币交易监控系统</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h2>版本</h2>
                  <p>1.0.0</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h2>技术栈</h2>
                  <p>Ionic React + TypeScript</p>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>
                  <h2>后端</h2>
                  <p>Gin + PostgreSQL + Redis</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* 保存确认弹窗 */}
        <IonAlert
          isOpen={showSaveAlert}
          header="确认保存"
          message="确定要保存当前设置吗？"
          buttons={[
            {
              text: '取消',
              role: 'cancel',
            },
            {
              text: '保存',
              handler: handleSaveSettings,
            },
          ]}
          onDidDismiss={() => setShowSaveAlert(false)}
        />

        {/* 提示消息 */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={2000}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
