import React, { useState, useEffect } from 'react';
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
  IonBadge,
  IonButton,
  IonSpinner,
  IonAlert,
  IonSelect,
  IonSelectOption,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonIcon,
} from '@ionic/react';
import { 
  refreshOutline, 
  trendingUpOutline, 
  trendingDownOutline, 
  timeOutline,
  statsChartOutline,
  pulseOutline
} from 'ionicons/icons';
import { apiService, KlineData, TradingSignal, MarketState } from '../services/api';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [klineData, setKlineData] = useState<KlineData[]>([]);
  const [tradingSignals, setTradingSignals] = useState<TradingSignal[]>([]);
  const [marketState, setMarketState] = useState<MarketState[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedSymbol, setSelectedSymbol] = useState('BTCUSDT');
  const [selectedInterval, setSelectedInterval] = useState('1');
  const [connectionStatus, setConnectionStatus] = useState<boolean | null>(null);

  const symbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT'];
  const intervals = ['1', '5', '15', '60', '240', 'D'];

  useEffect(() => {
    testConnection();
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [selectedSymbol, selectedInterval]);

  const testConnection = async () => {
    try {
      const isConnected = await apiService.testConnection();
      setConnectionStatus(isConnected);
    } catch (error) {
      setConnectionStatus(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [klines, signals, market] = await Promise.all([
        apiService.getKlineData(selectedSymbol, selectedInterval, 20),
        apiService.getTradingSignals(selectedSymbol, 10),
        apiService.getMarketState(selectedSymbol)
      ]);
      
      setKlineData(klines);
      setTradingSignals(signals);
      setMarketState(market);
    } catch (error) {
      setError('数据加载失败，请检查后端服务是否运行');
      console.error('加载数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  const formatTime = (timeStr: string) => {
    return new Date(timeStr).toLocaleString('zh-CN');
  };

  const getPriceChangeColor = (open: number, close: number) => {
    return close >= open ? 'success' : 'danger';
  };

  const getSignalColor = (signalType: string) => {
    switch (signalType.toLowerCase()) {
      case 'buy':
        return 'success';
      case 'sell':
        return 'danger';
      case 'hold':
        return 'warning';
      default:
        return 'medium';
    }
  };

  const getMarketStateColor = (state: string) => {
    switch (state.toLowerCase()) {
      case 'trending':
        return 'success';
      case 'volatile':
        return 'danger';
      case 'sideways':
        return 'warning';
      default:
        return 'medium';
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>加密货币交易监控</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">加密货币交易监控</IonTitle>
          </IonToolbar>
        </IonHeader>

        {/* 连接状态 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={pulseOutline} />
              系统状态
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonChip 
                    color={connectionStatus === true ? 'success' : connectionStatus === false ? 'danger' : 'medium'}
                  >
                    <IonIcon icon={pulseOutline} />
                    <IonLabel>
                      {connectionStatus === true ? '已连接' : connectionStatus === false ? '连接失败' : '检查中...'}
                    </IonLabel>
                  </IonChip>
                </IonCol>
                <IonCol size="6">
                  <IonButton 
                    size="small" 
                    fill="outline" 
                    onClick={testConnection}
                    disabled={loading}
                  >
                    <IonIcon icon={refreshOutline} slot="start" />
                    测试连接
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* 控制面板 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={statsChartOutline} />
              数据控制
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonSelect
                    value={selectedSymbol}
                    placeholder="选择交易对"
                    onIonChange={(e) => setSelectedSymbol(e.detail.value)}
                  >
                    {symbols.map(symbol => (
                      <IonSelectOption key={symbol} value={symbol}>{symbol}</IonSelectOption>
                    ))}
                  </IonSelect>
                </IonCol>
                <IonCol size="6">
                  <IonSelect
                    value={selectedInterval}
                    placeholder="选择时间间隔"
                    onIonChange={(e) => setSelectedInterval(e.detail.value)}
                  >
                    {intervals.map(interval => (
                      <IonSelectOption key={interval} value={interval}>
                        {interval === 'D' ? '日线' : `${interval}分钟`}
                      </IonSelectOption>
                    ))}
                  </IonSelect>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton 
                    expand="block" 
                    onClick={loadData}
                    disabled={loading}
                  >
                    <IonIcon icon={refreshOutline} slot="start" />
                    {loading ? <IonSpinner name="crescent" /> : '刷新数据'}
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* 错误提示 */}
        {error && (
          <IonAlert
            isOpen={!!error}
            header="错误"
            message={error}
            buttons={['确定']}
            onDidDismiss={() => setError(null)}
          />
        )}

        {/* K线数据 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={trendingUpOutline} />
              K线数据 ({klineData.length})
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {loading ? (
              <div className="loading-container">
                <IonSpinner name="crescent" />
                <p>加载中...</p>
              </div>
            ) : klineData.length > 0 ? (
              <IonList>
                {klineData.slice(0, 10).map((kline, index) => (
                  <IonItem key={index}>
                    <IonLabel>
                      <h2>{kline.symbol} - {kline.interval}分钟</h2>
                      <p>时间: {formatTime(kline.open_time)}</p>
                      <p>开盘: {formatPrice(kline.open)} | 收盘: {formatPrice(kline.close)}</p>
                      <p>最高: {formatPrice(kline.high)} | 最低: {formatPrice(kline.low)}</p>
                      <p>成交量: {formatPrice(kline.volume)}</p>
                    </IonLabel>
                    <IonBadge 
                      slot="end" 
                      color={getPriceChangeColor(kline.open, kline.close)}
                    >
                      {kline.close >= kline.open ? '+' : ''}
                      {formatPrice(kline.close - kline.open)}
                    </IonBadge>
                  </IonItem>
                ))}
              </IonList>
            ) : (
              <p>暂无K线数据</p>
            )}
          </IonCardContent>
        </IonCard>

        {/* 交易信号 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={trendingDownOutline} />
              交易信号 ({tradingSignals.length})
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {tradingSignals.length > 0 ? (
              <IonList>
                {tradingSignals.map((signal) => (
                  <IonItem key={signal.id}>
                    <IonLabel>
                      <h2>{signal.symbol} - {signal.signal_type}</h2>
                      <p>策略: {signal.strategy}</p>
                      <p>价格: {formatPrice(signal.price)}</p>
                      <p>时间: {formatTime(signal.timestamp)}</p>
                    </IonLabel>
                    <IonBadge 
                      slot="end" 
                      color={getSignalColor(signal.signal_type)}
                    >
                      强度: {signal.signal_strength}
                    </IonBadge>
                  </IonItem>
                ))}
              </IonList>
            ) : (
              <p>暂无交易信号</p>
            )}
          </IonCardContent>
        </IonCard>

        {/* 市场状态 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={timeOutline} />
              市场状态 ({marketState.length})
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {marketState.length > 0 ? (
              <IonList>
                {marketState.map((state, index) => (
                  <IonItem key={index}>
                    <IonLabel>
                      <h2>{state.symbol}</h2>
                      <p>状态: {state.market_state}</p>
                      <p>波动率: {state.volatility}%</p>
                      <p>趋势: {state.trend_direction}</p>
                      <p>最后分析: {formatTime(state.last_analysis)}</p>
                    </IonLabel>
                    <IonBadge 
                      slot="end" 
                      color={getMarketStateColor(state.market_state)}
                    >
                      {state.market_state}
                    </IonBadge>
                  </IonItem>
                ))}
              </IonList>
            ) : (
              <p>暂无市场状态数据</p>
            )}
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
