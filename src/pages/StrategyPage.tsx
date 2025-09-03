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
  IonSegment,
  IonSegmentButton,
  IonSearchbar,
  IonFab,
  IonFabButton,
  IonModal,
  IonButton as IonModalButton,
  IonButtons,
  IonBackButton,
  IonSpinner,
  IonAlert
} from '@ionic/react';
import {
  addOutline,
  playOutline,
  pauseOutline,
  settingsOutline,
  barChartOutline,
  timeOutline,
  trendingUpOutline,
  trendingDownOutline,
  removeOutline,
  checkmarkCircleOutline,
  closeCircleOutline
} from 'ionicons/icons';
import { apiService } from '../services/api';
import './StrategyPage.css';

const StrategyPage: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState('my');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [strategies, setStrategies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载策略数据
  const loadStrategies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const strategiesData = await apiService.getStrategies();
      setStrategies(strategiesData || []);
    } catch (err) {
      console.error('加载策略数据失败:', err);
      setError('加载策略数据失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时加载数据
  useEffect(() => {
    loadStrategies();
  }, []);

  // 模拟策略数据（作为备用）
  const mockStrategies = [
    {
      id: 1,
      name: 'RSI多周期共振策略',
      description: '基于RSI6/12/24的共振分析',
      category: 'rsi',
      symbols: ['BTC', 'ETH', 'BNB'],
      timeframes: ['5m', '1h', '4h'],
      winRate: 78,
      status: 'active',
      todaySignals: 3,
      lastSignal: { symbol: 'BTCUSDT', type: 'buy', time: '2分钟前' }
    },
    {
      id: 2,
      name: 'MA均线交叉策略',
      description: '5MA与20MA交叉信号',
      category: 'ma',
      symbols: ['主流币种'],
      timeframes: ['1h', '4h', '1d'],
      winRate: 65,
      status: 'paused',
      todaySignals: 0,
      lastSignal: { symbol: 'ETHUSDT', type: 'sell', time: '1小时前' }
    },
    {
      id: 3,
      name: '布林带突破策略',
      description: '价格突破布林带上下轨',
      category: 'bollinger',
      symbols: ['BTC', 'ETH'],
      timeframes: ['15m', '1h'],
      winRate: 72,
      status: 'active',
      todaySignals: 1,
      lastSignal: { symbol: 'BNBUSDT', type: 'buy', time: '30分钟前' }
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'rsi': return barChartOutline;
      case 'ma': return trendingUpOutline;
      case 'bollinger': return trendingDownOutline;
      default: return barChartOutline;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'rsi': return 'primary';
      case 'ma': return 'secondary';
      case 'bollinger': return 'tertiary';
      default: return 'medium';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return playOutline;
      case 'paused': return pauseOutline;
      case 'error': return closeCircleOutline;
      default: return pauseOutline;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'paused': return 'warning';
      case 'error': return 'danger';
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

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return '运行中';
      case 'paused': return '暂停';
      case 'error': return '错误';
      default: return '未知';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>策略管理</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear">
              <IonIcon icon={settingsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
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
            <p>加载策略数据中...</p>
          </div>
        )}

        {/* 搜索栏 */}
        <IonSearchbar placeholder="搜索策略..." />

        {/* 策略分类 */}
        <IonSegment 
          value={selectedSegment} 
          onIonChange={e => setSelectedSegment(e.detail.value as string)}
        >
          <IonSegmentButton value="my">
            <IonLabel>我的策略</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="preset">
            <IonLabel>预设策略</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="community">
            <IonLabel>社区策略</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {/* 策略列表 */}
        <IonList>
          {(strategies.length > 0 ? strategies : mockStrategies).map((strategy) => (
            <IonCard key={strategy.id} className="strategy-card">
              <IonCardHeader>
                <IonCardTitle>
                  <div className="strategy-header">
                    <div className="strategy-title">
                      <IonIcon 
                        icon={getCategoryIcon(strategy.category)} 
                        color={getCategoryColor(strategy.category)}
                      />
                      <span>{strategy.name}</span>
                    </div>
                    <IonChip color={getStatusColor(strategy.status)}>
                      <IonIcon icon={getStatusIcon(strategy.status)} />
                      <IonLabel>{getStatusText(strategy.status)}</IonLabel>
                    </IonChip>
                  </div>
                </IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <div className="strategy-description">
                  {strategy.description}
                </div>
                
                <IonGrid>
                  <IonRow>
                    <IonCol size="6">
                      <div className="strategy-info">
                        <IonLabel>🎯 类型: {strategy.type || 'N/A'}</IonLabel>
                      </div>
                    </IonCol>
                    <IonCol size="6">
                      <div className="strategy-info">
                        <IonLabel>⏰ 周期: {strategy.timeframe || 'N/A'}</IonLabel>
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="4">
                      <div className="strategy-metric">
                        <IonLabel>📊 胜率: {strategy.performance?.win_rate || strategy.winRate || 'N/A'}%</IonLabel>
                      </div>
                    </IonCol>
                    <IonCol size="4">
                      <div className="strategy-metric">
                        <IonLabel>💰 收益率: {strategy.performance?.profit_rate || 'N/A'}%</IonLabel>
                      </div>
                    </IonCol>
                    <IonCol size="4">
                      <div className="strategy-metric">
                        <IonLabel>
                          📉 最大回撤: {strategy.performance?.max_drawdown || 'N/A'}%
                        </IonLabel>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>

                <div className="strategy-actions">
                  <IonButton 
                    fill="outline" 
                    size="small"
                    color={strategy.status === 'ACTIVE' ? 'warning' : 'success'}
                  >
                    <IonIcon 
                      icon={strategy.status === 'ACTIVE' ? pauseOutline : playOutline} 
                      slot="start" 
                    />
                    {strategy.status === 'ACTIVE' ? '暂停' : '启动'}
                  </IonButton>
                  <IonButton fill="outline" size="small" color="primary">
                    <IonIcon icon={settingsOutline} slot="start" />
                    编辑
                  </IonButton>
                </div>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>

        {/* 创建策略按钮 */}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => setShowCreateModal(true)}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>

        {/* 创建策略模态框 */}
        <IonModal isOpen={showCreateModal} onDidDismiss={() => setShowCreateModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>创建新策略</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowCreateModal(false)}>关闭</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonCard>
              <IonCardContent>
                <IonGrid>
                  <IonRow>
                    <IonCol>
                      <IonButton expand="block" fill="outline" color="primary">
                        <IonIcon icon={barChartOutline} slot="start" />
                        傻瓜模式
                        <br />
                        <small>选择预设模板</small>
                      </IonButton>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonButton expand="block" fill="outline" color="secondary">
                        <IonIcon icon={settingsOutline} slot="start" />
                        自由模式
                        <br />
                        <small>自定义指标组合</small>
                      </IonButton>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonButton expand="block" fill="outline" color="tertiary">
                        <IonIcon icon={trendingUpOutline} slot="start" />
                        AI优化模式
                        <br />
                        <small>自动调整参数</small>
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default StrategyPage;
