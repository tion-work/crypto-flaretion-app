import React, { useState, useEffect } from 'react';
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
  RefresherEventDetail,
  IonSpinner,
  IonAlert
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
import { apiService } from '../services/api';
import './HomePage.css';

const HomePage: React.FC = () => {
  // 状态管理
  const [marketData, setMarketData] = useState<any[]>([]);
  const [latestSignals, setLatestSignals] = useState<any[]>([]);
  const [systemStatus, setSystemStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载数据
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // 并行加载数据
      const [marketStateResult, signalsResult, statusResult] = await Promise.all([
        apiService.getMarketState('BTCUSDT'),
        apiService.getTradingSignals('BTCUSDT', 3),
        apiService.getSystemStatus()
      ]);

      // 处理市场数据
      if (marketStateResult && marketStateResult.length > 0) {
        const market = marketStateResult[0] as any;
        setMarketData([{
          symbol: 'BTC',
          price: `$${market.price?.toFixed(2) || '0'}`,
          change: `${market.change_24h?.toFixed(2) || '0'}%`,
          trend: market.change_24h > 0 ? 'up' : 'down'
        }]);
      }

      // 处理交易信号
      if (signalsResult && signalsResult.length > 0) {
        setLatestSignals(signalsResult.map((signal: any) => ({
          symbol: signal.symbol,
          type: signal.signal_type?.toLowerCase() || 'hold',
          strength: signal.confidence > 70 ? 'strong' : signal.confidence > 40 ? 'medium' : 'weak',
          time: new Date(signal.timestamp * 1000).toLocaleString('zh-CN')
        })));
      }

      // 处理系统状态
      setSystemStatus(statusResult);

    } catch (err) {
      console.error('加载数据失败:', err);
      setError('加载数据失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时加载数据
  useEffect(() => {
    loadData();
  }, []);

  // 下拉刷新
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await loadData();
    event.detail.complete();
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

        {/* 错误提示 */}
        <IonAlert
          isOpen={!!error}
          onDidDismiss={() => setError(null)}
          header="错误"
          message={error || ''}
          buttons={['确定']}
        />

        {/* 加载状态 */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '20px' }}>
            <IonSpinner name="crescent" />
            <p>加载中...</p>
          </div>
        )}

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
