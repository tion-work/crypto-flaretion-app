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
  IonSegment,
  IonSegmentButton,
  IonProgressBar,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonItem,
  IonList,
  IonBadge,
  IonSpinner,
  IonAlert
} from '@ionic/react';
import {
  analyticsOutline,
  barChartOutline,
  trendingUpOutline,
  trendingDownOutline,
  removeOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  timeOutline,
  speedometerOutline
} from 'ionicons/icons';
import { apiService } from '../services/api';
import './AnalysisPage.css';

const AnalysisPage: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('5m');
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 加载分析数据
  const loadAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await apiService.getAnalysis();
      setAnalysisData(data);
    } catch (err) {
      console.error('加载分析数据失败:', err);
      setError('加载分析数据失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时加载数据
  useEffect(() => {
    loadAnalysis();
  }, []);

  // 模拟RSI数据
  const rsiData = {
    rsi6: 45.2,
    rsi12: 38.7,
    rsi24: 42.1,
    resonanceLevel: 'partial',
    signalStrength: 'medium'
  };

  // 模拟市场状态数据
  const marketState = {
    score: 0.65,
    state: 'sideways',
    confidence: 78,
    timeframes: ['5m', '1h', '4h'],
    weights: { '5m': 0.3, '1h': 0.4, '4h': 0.3 }
  };

  const getRSIStatus = (rsi: number) => {
    if (rsi < 30) return { status: 'oversold', color: 'success', icon: trendingUpOutline };
    if (rsi > 70) return { status: 'overbought', color: 'danger', icon: trendingDownOutline };
    return { status: 'neutral', color: 'warning', icon: removeOutline };
  };

  const getResonanceLevel = (level: string) => {
    switch (level) {
      case 'strong': return { text: '强烈共振', color: 'danger', icon: checkmarkCircleOutline };
      case 'partial': return { text: '部分共振', color: 'warning', icon: timeOutline };
      default: return { text: '无共振', color: 'medium', icon: closeCircleOutline };
    }
  };

  const getMarketStateText = (state: string) => {
    switch (state) {
      case 'trending_up': return '趋势上涨';
      case 'trending_down': return '趋势下跌';
      case 'sideways': return '横盘整理';
      case 'volatile': return '震荡波动';
      case 'uncertain': return '不确定';
      default: return '未知';
    }
  };

  const getMarketStateColor = (state: string) => {
    switch (state) {
      case 'trending_up': return 'success';
      case 'trending_down': return 'danger';
      case 'sideways': return 'warning';
      case 'volatile': return 'tertiary';
      case 'uncertain': return 'medium';
      default: return 'medium';
    }
  };

  const getSignalStrengthText = (strength: string) => {
    switch (strength) {
      case 'strong': return '强';
      case 'medium': return '中';
      case 'weak': return '弱';
      default: return '未知';
    }
  };

  const getSignalStrengthColor = (strength: string) => {
    switch (strength) {
      case 'strong': return 'danger';
      case 'medium': return 'warning';
      case 'weak': return 'medium';
      default: return 'medium';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>深度分析</IonTitle>
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
            <p>加载分析数据中...</p>
          </div>
        )}

        {/* 选择器 */}
        <IonCard>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonItem>
                    <IonLabel>交易对</IonLabel>
                    <IonSelect 
                      value={selectedSymbol} 
                      onIonChange={e => setSelectedSymbol(e.detail.value)}
                    >
                      <IonSelectOption value="BTCUSDT">BTCUSDT</IonSelectOption>
                      <IonSelectOption value="ETHUSDT">ETHUSDT</IonSelectOption>
                      <IonSelectOption value="BNBUSDT">BNBUSDT</IonSelectOption>
                      <IonSelectOption value="ADAUSDT">ADAUSDT</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonCol>
                <IonCol size="6">
                  <IonItem>
                    <IonLabel>时间周期</IonLabel>
                    <IonSelect 
                      value={selectedTimeframe} 
                      onIonChange={e => setSelectedTimeframe(e.detail.value)}
                    >
                      <IonSelectOption value="1m">1分钟</IonSelectOption>
                      <IonSelectOption value="5m">5分钟</IonSelectOption>
                      <IonSelectOption value="15m">15分钟</IonSelectOption>
                      <IonSelectOption value="1h">1小时</IonSelectOption>
                      <IonSelectOption value="4h">4小时</IonSelectOption>
                      <IonSelectOption value="1d">1天</IonSelectOption>
                    </IonSelect>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* 多周期选择 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>📊 多周期分析</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonSegment value="5m,1h,4h">
              <IonSegmentButton value="1m">
                <IonLabel>1m</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="5m">
                <IonLabel>5m</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="15m">
                <IonLabel>15m</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="1h">
                <IonLabel>1h</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="4h">
                <IonLabel>4h</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="1d">
                <IonLabel>1d</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonCardContent>
        </IonCard>

        {/* RSI共振分析 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>📈 RSI共振分析 - {selectedSymbol}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="4">
                  <div className="rsi-item">
                    <div className="rsi-label">RSI6</div>
                    <div className="rsi-value">{rsiData.rsi6}</div>
                    <IonChip color={getRSIStatus(rsiData.rsi6).color}>
                      <IonIcon icon={getRSIStatus(rsiData.rsi6).icon} />
                      <IonLabel>{getRSIStatus(rsiData.rsi6).status === 'oversold' ? '超卖' : 
                                getRSIStatus(rsiData.rsi6).status === 'overbought' ? '超买' : '中性'}</IonLabel>
                    </IonChip>
                  </div>
                </IonCol>
                <IonCol size="4">
                  <div className="rsi-item">
                    <div className="rsi-label">RSI12</div>
                    <div className="rsi-value">{rsiData.rsi12}</div>
                    <IonChip color={getRSIStatus(rsiData.rsi12).color}>
                      <IonIcon icon={getRSIStatus(rsiData.rsi12).icon} />
                      <IonLabel>{getRSIStatus(rsiData.rsi12).status === 'oversold' ? '超卖' : 
                                getRSIStatus(rsiData.rsi12).status === 'overbought' ? '超买' : '中性'}</IonLabel>
                    </IonChip>
                  </div>
                </IonCol>
                <IonCol size="4">
                  <div className="rsi-item">
                    <div className="rsi-label">RSI24</div>
                    <div className="rsi-value">{rsiData.rsi24}</div>
                    <IonChip color={getRSIStatus(rsiData.rsi24).color}>
                      <IonIcon icon={getRSIStatus(rsiData.rsi24).icon} />
                      <IonLabel>{getRSIStatus(rsiData.rsi24).status === 'oversold' ? '超卖' : 
                                getRSIStatus(rsiData.rsi24).status === 'overbought' ? '超买' : '中性'}</IonLabel>
                    </IonChip>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
            
            <div className="resonance-analysis">
              <div className="resonance-status">
                <IonIcon 
                  icon={getResonanceLevel(rsiData.resonanceLevel).icon} 
                  color={getResonanceLevel(rsiData.resonanceLevel).color}
                />
                <span>共振状态: {getResonanceLevel(rsiData.resonanceLevel).text}</span>
              </div>
              <div className="signal-strength">
                <IonBadge color={getSignalStrengthColor(rsiData.signalStrength)}>
                  信号强度: {getSignalStrengthText(rsiData.signalStrength)}
                </IonBadge>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        {/* 市场状态分析 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>🎯 市场状态分析</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="market-state-overview">
              <div className="state-score">
                <div className="score-label">综合得分</div>
                <div className="score-value">{marketState.score}</div>
                <IonProgressBar value={marketState.score} color="primary"></IonProgressBar>
              </div>
              
              <div className="state-classification">
                <IonChip color={getMarketStateColor(marketState.state)}>
                  <IonIcon icon={analyticsOutline} />
                  <IonLabel>状态分类: {getMarketStateText(marketState.state)}</IonLabel>
                </IonChip>
              </div>
              
              <div className="confidence-level">
                <IonChip color="secondary">
                  <IonIcon icon={speedometerOutline} />
                  <IonLabel>置信度: {marketState.confidence}%</IonLabel>
                </IonChip>
              </div>
            </div>
            
            <div className="timeframe-weights">
              <div className="weights-title">📊 各周期权重:</div>
              <IonGrid>
                <IonRow>
                  {Object.entries(marketState.weights).map(([timeframe, weight]) => (
                    <IonCol key={timeframe} size="4">
                      <div className="weight-item">
                        <div className="weight-timeframe">{timeframe}</div>
                        <div className="weight-value">{weight}</div>
                        <IonProgressBar value={weight} color="secondary"></IonProgressBar>
                      </div>
                    </IonCol>
                  ))}
                </IonRow>
              </IonGrid>
            </div>
          </IonCardContent>
        </IonCard>

        {/* 历史数据图表 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>📊 历史数据图表</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="chart-placeholder">
              <IonIcon icon={barChartOutline} size="large" />
              <p>图表功能开发中...</p>
              <IonButton fill="outline" size="small">
                查看详细图表
              </IonButton>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default AnalysisPage;
