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
  IonButtons,
  IonItem,
  IonLabel,
  IonList,
  IonBadge,
  IonSegment,
  IonSegmentButton,
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonToggle,
  IonItemDivider,
  IonSpinner,
  IonAlert
} from '@ionic/react';
import {
  notificationsOutline,
  addOutline,
  removeOutline,
  timeOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  settingsOutline,
  barChartOutline,
  trendingUpOutline,
  trendingDownOutline,
  pauseOutline
} from 'ionicons/icons';
import { apiService } from '../services/api';
import './SignalsPage.css';

const SignalsPage: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState('realtime');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [signals, setSignals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载信号数据
  const loadSignals = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const signalsData = await apiService.getTradingSignals('BTCUSDT', 20);
      setSignals(signalsData || []);
    } catch (err) {
      console.error('加载信号数据失败:', err);
      setError('加载信号数据失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时加载数据
  useEffect(() => {
    loadSignals();
  }, []);

  // 下拉刷新
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    await loadSignals();
    event.detail.complete();
  };

  // 模拟信号数据（作为备用）
  const mockSignals = [
    {
      id: 1,
      symbol: 'BTCUSDT',
      type: 'buy',
      strength: 'strong',
      strategy: 'RSI共振',
      confidence: 85,
      price: '$43,250',
      time: '2分钟前',
      status: 'new',
      conditions: 'RSI6<30, RSI12<30, RSI24<30'
    },
    {
      id: 2,
      symbol: 'ETHUSDT',
      type: 'hold',
      strength: 'medium',
      strategy: 'MA交叉',
      confidence: 65,
      price: '$2,680',
      time: '5分钟前',
      status: 'read',
      conditions: 'MA5与MA20接近交叉'
    },
    {
      id: 3,
      symbol: 'BNBUSDT',
      type: 'sell',
      strength: 'strong',
      strategy: '布林带突破',
      confidence: 78,
      price: '$315',
      time: '8分钟前',
      status: 'read',
      conditions: '价格突破布林带上轨'
    },
    {
      id: 4,
      symbol: 'ADAUSDT',
      type: 'buy',
      strength: 'weak',
      strategy: 'RSI单周期',
      confidence: 45,
      price: '$0.45',
      time: '15分钟前',
      status: 'read',
      conditions: 'RSI12<35'
    }
  ];

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'buy': return addOutline;
      case 'sell': return removeOutline;
      default: return pauseOutline;
    }
  };

  const getSignalColor = (type: string) => {
    switch (type) {
      case 'buy': return 'success';
      case 'sell': return 'danger';
      default: return 'warning';
    }
  };

  const getSignalTypeText = (type: string) => {
    switch (type) {
      case 'buy': return '买入';
      case 'sell': return '卖出';
      default: return '观望';
    }
  };

  const getStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'danger';
      case 'medium': return 'warning';
      case 'weak': return 'medium';
      default: return 'medium';
    }
  };

  const getStrengthText = (strength: string) => {
    switch (strength) {
      case 'strong': return '强';
      case 'medium': return '中';
      case 'weak': return '弱';
      default: return '未知';
    }
  };

  const getStrategyIcon = (strategy: string) => {
    switch (strategy) {
      case 'RSI共振': return barChartOutline;
      case 'MA交叉': return trendingUpOutline;
      case '布林带突破': return trendingDownOutline;
      default: return barChartOutline;
    }
  };



  const filteredSignals = (signals.length > 0 ? signals : mockSignals).filter(signal => {
    switch (selectedSegment) {
      case 'realtime':
        return signal.status === 'new';
      case 'history':
        return signal.status === 'read';
      case 'my':
        return signal.strategy.includes('RSI');
      default:
        return true;
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>交易信号</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear">
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
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
            <p>加载信号数据中...</p>
          </div>
        )}

        {/* 信号分类 */}
        <IonSegment 
          value={selectedSegment} 
          onIonChange={e => setSelectedSegment(e.detail.value as string)}
        >
          <IonSegmentButton value="realtime">
            <IonLabel>实时信号</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="history">
            <IonLabel>历史信号</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="my">
            <IonLabel>我的信号</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* 通知设置 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>🔔 通知设置</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonItem>
              <IonIcon icon={notificationsOutline} slot="start" />
              <IonLabel>推送通知</IonLabel>
              <IonToggle 
                checked={notificationsEnabled} 
                onIonChange={e => setNotificationsEnabled(e.detail.checked)}
              />
            </IonItem>
            <IonItem>
              <IonIcon icon={settingsOutline} slot="start" />
              <IonLabel>声音提醒</IonLabel>
              <IonToggle checked={true} />
            </IonItem>
            <IonItem>
              <IonIcon icon={timeOutline} slot="start" />
              <IonLabel>震动提醒</IonLabel>
              <IonToggle checked={true} />
            </IonItem>
          </IonCardContent>
        </IonCard>

        {/* 信号统计 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>📊 信号统计</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <div className="stat-item">
                    <div className="stat-value">12</div>
                    <div className="stat-label">今日信号</div>
                  </div>
                </IonCol>
                <IonCol size="4">
                  <div className="stat-item">
                    <div className="stat-value">78%</div>
                    <div className="stat-label">准确率</div>
                  </div>
                </IonCol>
                <IonCol size="4">
                  <div className="stat-item">
                    <div className="stat-value">3</div>
                    <div className="stat-label">活跃策略</div>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* 信号列表 */}
        <IonList>
          {filteredSignals.map((signal) => (
            <IonCard key={signal.id} className={`signal-card ${signal.status}`}>
              <IonCardContent>
                <div className="signal-header">
                  <div className="signal-main">
                    <IonIcon 
                      icon={getSignalIcon(signal.type)} 
                      color={getSignalColor(signal.type)}
                      className="signal-icon"
                    />
                    <div className="signal-info">
                      <div className="signal-symbol">{signal.symbol}</div>
                      <div className="signal-type">
                        {getSignalTypeText(signal.type)}信号
                        <IonBadge color={getStrengthColor(signal.strength)}>
                          强度: {getStrengthText(signal.strength)}
                        </IonBadge>
                      </div>
                    </div>
                  </div>
                  <div className="signal-time">
                    <IonIcon icon={timeOutline} />
                    <span>{signal.time}</span>
                  </div>
                </div>

                <div className="signal-details">
                  <IonGrid>
                    <IonRow>
                      <IonCol size="6">
                        <div className="detail-item">
                          <IonIcon icon={getStrategyIcon(signal.strategy)} />
                          <span>策略: {signal.strategy}</span>
                        </div>
                      </IonCol>
                      <IonCol size="6">
                        <div className="detail-item">
                          <IonIcon icon={checkmarkCircleOutline} />
                          <span>置信度: {signal.confidence}%</span>
                        </div>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol size="6">
                        <div className="detail-item">
                          <IonIcon icon={trendingUpOutline} />
                          <span>价格: {signal.price}</span>
                        </div>
                      </IonCol>
                      <IonCol size="6">
                        <div className="detail-item">
                          <IonIcon icon={barChartOutline} />
                          <span>触发条件</span>
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                  
                  <div className="signal-conditions">
                    <IonChip color="light">
                      <IonLabel>{signal.conditions}</IonLabel>
                    </IonChip>
                  </div>
                </div>

                <div className="signal-actions">
                  <IonButton fill="outline" size="small" color="primary">
                    查看详情
                  </IonButton>
                  <IonButton fill="outline" size="small" color="secondary">
                    添加到策略
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>

        {filteredSignals.length === 0 && (
          <IonCard>
            <IonCardContent>
              <div className="empty-state">
                <IonIcon icon={notificationsOutline} size="large" />
                <p>暂无信号数据</p>
                <IonButton fill="outline" size="small">
                  刷新数据
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        )}
      </IonContent>
    </IonPage>
  );
};

export default SignalsPage;
