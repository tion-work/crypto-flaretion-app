import React, { useState } from 'react';
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
  IonBackButton
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
import './StrategyPage.css';

const StrategyPage: React.FC = () => {
  const [selectedSegment, setSelectedSegment] = useState('my');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // 模拟策略数据
  const strategies = [
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
          {strategies.map((strategy) => (
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
                        <IonLabel>🎯 适用: {strategy.symbols.join(', ')}</IonLabel>
                      </div>
                    </IonCol>
                    <IonCol size="6">
                      <div className="strategy-info">
                        <IonLabel>⏰ 周期: {strategy.timeframes.join(', ')}</IonLabel>
                      </div>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="4">
                      <div className="strategy-metric">
                        <IonLabel>📊 胜率: {strategy.winRate}%</IonLabel>
                      </div>
                    </IonCol>
                    <IonCol size="4">
                      <div className="strategy-metric">
                        <IonLabel>⚡ 今日: {strategy.todaySignals}信号</IonLabel>
                      </div>
                    </IonCol>
                    <IonCol size="4">
                      <div className="strategy-metric">
                        <IonLabel>
                          {strategy.lastSignal.type === 'buy' ? '🟢' : 
                           strategy.lastSignal.type === 'sell' ? '🔴' : '🟡'} 
                          最后信号: {strategy.lastSignal.symbol} {strategy.lastSignal.type === 'buy' ? '买入' : strategy.lastSignal.type === 'sell' ? '卖出' : '观望'}
                        </IonLabel>
                      </div>
                    </IonCol>
                  </IonRow>
                </IonGrid>

                <div className="strategy-actions">
                  <IonButton 
                    fill="outline" 
                    size="small"
                    color={strategy.status === 'active' ? 'warning' : 'success'}
                  >
                    <IonIcon 
                      icon={strategy.status === 'active' ? pauseOutline : playOutline} 
                      slot="start" 
                    />
                    {strategy.status === 'active' ? '暂停' : '启动'}
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
