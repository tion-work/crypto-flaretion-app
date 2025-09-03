import React from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonIcon,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonBadge,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail
} from '@ionic/react';
import {
  trendingUpOutline,
  trendingDownOutline,
  removeOutline,
  addOutline,
  barChartOutline,
  analyticsOutline,
  notificationsOutline,
  timeOutline
} from 'ionicons/icons';
import './HomePage.css';

const HomePage: React.FC = () => {
  // 模拟数据
  const marketData = [
    { symbol: 'BTC', price: '$43,250', change: '+2.5%', trend: 'up' },
    { symbol: 'ETH', price: '$2,680', change: '-1.2%', trend: 'down' },
    { symbol: 'BNB', price: '$315', change: '+0.8%', trend: 'up' },
    { symbol: 'ADA', price: '$0.45', change: '+3.1%', trend: 'up' }
  ];

  const latestSignals = [
    { symbol: 'BTCUSDT', type: 'buy', strength: 'strong', time: '2分钟前' },
    { symbol: 'ETHUSDT', type: 'hold', strength: 'medium', time: '5分钟前' },
    { symbol: 'BNBUSDT', type: 'sell', strength: 'strong', time: '8分钟前' }
  ];

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    setTimeout(() => {
      event.detail.complete();
    }, 2000);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return trendingUpOutline;
      case 'down': return trendingDownOutline;
      default: return removeOutline;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'success';
      case 'down': return 'danger';
      default: return 'medium';
    }
  };

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'buy': return addOutline;
      case 'sell': return removeOutline;
      default: return removeOutline;
    }
  };

  const getSignalColor = (type: string) => {
    switch (type) {
      case 'buy': return 'success';
      case 'sell': return 'danger';
      default: return 'warning';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Flaretion</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* 用户状态卡片 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>👤 欢迎回来，张三</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <IonChip color="primary">
                    <IonLabel>📊 专业版用户</IonLabel>
                  </IonChip>
                </IonCol>
                <IonCol size="4">
                  <IonChip color="secondary">
                    <IonLabel>📈 3个活跃策略</IonLabel>
                  </IonChip>
                </IonCol>
                <IonCol size="4">
                  <IonChip color="tertiary">
                    <IonLabel>🔔 今日5个信号</IonLabel>
                  </IonChip>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonLabel>⏰ 订阅到期: 2024-12-31</IonLabel>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* 市场概览 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>📈 市场概览</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                {marketData.map((coin, index) => (
                  <IonCol size="6" key={index}>
                    <IonCard className="market-card">
                      <IonCardContent>
                        <div className="coin-info">
                          <div className="coin-symbol">{coin.symbol}</div>
                          <div className="coin-price">{coin.price}</div>
                          <div className={`coin-change ${getTrendColor(coin.trend)}`}>
                            <IonIcon icon={getTrendIcon(coin.trend)} />
                            {coin.change}
                          </div>
                        </div>
                      </IonCardContent>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
            <div className="market-status">
              <IonChip color="warning">
                <IonLabel>🎯 当前市场状态: 横盘整理 (得分: 0.65)</IonLabel>
              </IonChip>
            </div>
          </IonCardContent>
        </IonCard>

        {/* 快速操作 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>⚡ 快速操作</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <IonButton expand="block" fill="outline" routerLink="/strategy">
                    <IonIcon icon={addOutline} slot="start" />
                    创建策略
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton expand="block" fill="outline" routerLink="/strategy">
                    <IonIcon icon={barChartOutline} slot="start" />
                    策略库
                  </IonButton>
                </IonCol>
                <IonCol size="4">
                  <IonButton expand="block" fill="outline" routerLink="/analysis">
                    <IonIcon icon={analyticsOutline} slot="start" />
                    深度分析
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* 最新信号 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>📡 最新信号</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              {latestSignals.map((signal, index) => (
                <IonItem key={index}>
                  <IonIcon 
                    icon={getSignalIcon(signal.type)} 
                    color={getSignalColor(signal.type)}
                    slot="start" 
                  />
                  <IonLabel>
                    <h3>{signal.symbol}</h3>
                    <p>
                      {signal.type === 'buy' ? '买入' : signal.type === 'sell' ? '卖出' : '观望'}信号
                      <IonBadge color={signal.strength === 'strong' ? 'danger' : 'warning'}>
                        强度: {signal.strength === 'strong' ? '强' : '中'}
                      </IonBadge>
                    </p>
                  </IonLabel>
                  <IonIcon icon={timeOutline} slot="end" />
                  <IonLabel slot="end">
                    <p>{signal.time}</p>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
