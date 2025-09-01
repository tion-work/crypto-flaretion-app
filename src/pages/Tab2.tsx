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
  IonProgressBar,
  IonGrid,
  IonRow,
  IonCol,
  IonChip,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import { 
  serverOutline, 
  analyticsOutline, 
  settingsOutline,
  timeOutline,
  pulseOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  warningOutline,
  refreshOutline
} from 'ionicons/icons';
import { apiService } from '../services/api';
import './Tab2.css';

interface SystemStatus {
  status: string;
  uptime: string;
  version: string;
  database_status: string;
  websocket_status: string;
  redis_status: string;
  last_update: string;
}

interface PerformanceMetrics {
  total_requests: number;
  successful_requests: number;
  error_count: number;
  cache_hit_rate: number;
  signal_generation_time: number;
  strategy_switch_count: number;
}

const Tab2: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  useEffect(() => {
    loadSystemData();
  }, []);

  const loadSystemData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // 这里可以调用实际的API，现在使用模拟数据
      const mockSystemStatus: SystemStatus = {
        status: 'running',
        uptime: '2 days, 5 hours, 30 minutes',
        version: '1.0.0',
        database_status: 'connected',
        websocket_status: 'connected',
        redis_status: 'connected',
        last_update: new Date().toISOString()
      };

      const mockPerformanceMetrics: PerformanceMetrics = {
        total_requests: 15420,
        successful_requests: 15380,
        error_count: 40,
        cache_hit_rate: 85.5,
        signal_generation_time: 150,
        strategy_switch_count: 12
      };

      setSystemStatus(mockSystemStatus);
      setPerformanceMetrics(mockPerformanceMetrics);
      setLastRefresh(new Date());
    } catch (error) {
      setError('系统数据加载失败');
      console.error('加载系统数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async (event: CustomEvent) => {
    await loadSystemData();
    event.detail.complete();
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'running':
      case 'connected':
        return 'success';
      case 'stopped':
      case 'disconnected':
        return 'danger';
      case 'starting':
      case 'connecting':
        return 'warning';
      default:
        return 'medium';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'running':
      case 'connected':
        return checkmarkCircleOutline;
      case 'stopped':
      case 'disconnected':
        return closeCircleOutline;
      case 'starting':
      case 'connecting':
        return warningOutline;
      default:
        return pulseOutline;
    }
  };

  const formatUptime = (uptime: string) => {
    return uptime;
  };

  const calculateErrorRate = () => {
    if (!performanceMetrics) return 0;
    return (performanceMetrics.error_count / performanceMetrics.total_requests) * 100;
  };

  const calculateSuccessRate = () => {
    if (!performanceMetrics) return 0;
    return (performanceMetrics.successful_requests / performanceMetrics.total_requests) * 100;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>系统监控</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">系统监控</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        {/* 系统状态概览 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={serverOutline} />
              系统状态概览
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {loading ? (
              <div className="loading-container">
                <IonSpinner name="crescent" />
                <p>加载中...</p>
              </div>
            ) : systemStatus ? (
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <IonChip color={getStatusColor(systemStatus.status)}>
                      <IonIcon icon={getStatusIcon(systemStatus.status)} />
                      <IonLabel>系统: {systemStatus.status}</IonLabel>
                    </IonChip>
                  </IonCol>
                  <IonCol size="6">
                    <IonChip color="primary">
                      <IonIcon icon={timeOutline} />
                      <IonLabel>版本: {systemStatus.version}</IonLabel>
                    </IonChip>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <p><strong>运行时间:</strong> {formatUptime(systemStatus.uptime)}</p>
                    <p><strong>最后更新:</strong> {new Date(systemStatus.last_update).toLocaleString('zh-CN')}</p>
                  </IonCol>
                </IonRow>
              </IonGrid>
            ) : (
              <p>暂无系统状态数据</p>
            )}
          </IonCardContent>
        </IonCard>

        {/* 服务状态 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={pulseOutline} />
              服务状态
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {systemStatus ? (
              <IonList>
                <IonItem>
                  <IonLabel>
                    <h2>数据库</h2>
                    <p>PostgreSQL 连接状态</p>
                  </IonLabel>
                  <IonBadge 
                    slot="end" 
                    color={getStatusColor(systemStatus.database_status)}
                  >
                    <IonIcon icon={getStatusIcon(systemStatus.database_status)} />
                    {systemStatus.database_status}
                  </IonBadge>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h2>WebSocket</h2>
                    <p>Bybit 连接状态</p>
                  </IonLabel>
                  <IonBadge 
                    slot="end" 
                    color={getStatusColor(systemStatus.websocket_status)}
                  >
                    <IonIcon icon={getStatusIcon(systemStatus.websocket_status)} />
                    {systemStatus.websocket_status}
                  </IonBadge>
                </IonItem>
                <IonItem>
                  <IonLabel>
                    <h2>Redis</h2>
                    <p>缓存服务状态</p>
                  </IonLabel>
                  <IonBadge 
                    slot="end" 
                    color={getStatusColor(systemStatus.redis_status)}
                  >
                    <IonIcon icon={getStatusIcon(systemStatus.redis_status)} />
                    {systemStatus.redis_status}
                  </IonBadge>
                </IonItem>
              </IonList>
            ) : (
              <p>暂无服务状态数据</p>
            )}
          </IonCardContent>
        </IonCard>

        {/* 性能指标 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={analyticsOutline} />
              性能指标
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            {performanceMetrics ? (
              <IonGrid>
                <IonRow>
                  <IonCol size="6">
                    <h3>请求统计</h3>
                    <p><strong>总请求:</strong> {performanceMetrics.total_requests.toLocaleString()}</p>
                    <p><strong>成功请求:</strong> {performanceMetrics.successful_requests.toLocaleString()}</p>
                    <p><strong>错误数量:</strong> {performanceMetrics.error_count.toLocaleString()}</p>
                  </IonCol>
                  <IonCol size="6">
                    <h3>成功率</h3>
                    <IonProgressBar 
                      value={calculateSuccessRate() / 100} 
                      color="success"
                    />
                    <p>{calculateSuccessRate().toFixed(1)}%</p>
                    
                    <h3>错误率</h3>
                    <IonProgressBar 
                      value={calculateErrorRate() / 100} 
                      color="danger"
                    />
                    <p>{calculateErrorRate().toFixed(1)}%</p>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="6">
                    <h3>缓存命中率</h3>
                    <IonProgressBar 
                      value={performanceMetrics.cache_hit_rate / 100} 
                      color="primary"
                    />
                    <p>{performanceMetrics.cache_hit_rate}%</p>
                  </IonCol>
                  <IonCol size="6">
                    <h3>其他指标</h3>
                    <p><strong>信号生成时间:</strong> {performanceMetrics.signal_generation_time}ms</p>
                    <p><strong>策略切换次数:</strong> {performanceMetrics.strategy_switch_count}</p>
                  </IonCol>
                </IonRow>
              </IonGrid>
            ) : (
              <p>暂无性能指标数据</p>
            )}
          </IonCardContent>
        </IonCard>

        {/* 操作面板 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>
              <IonIcon icon={settingsOutline} />
              操作面板
            </IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <IonButton 
                    expand="block" 
                    fill="outline"
                    onClick={loadSystemData}
                    disabled={loading}
                  >
                    <IonIcon icon={refreshOutline} slot="start" />
                    刷新数据
                  </IonButton>
                </IonCol>
                <IonCol size="6">
                  <IonButton 
                    expand="block" 
                    fill="outline"
                    color="warning"
                  >
                    <IonIcon icon={settingsOutline} slot="start" />
                    系统设置
                  </IonButton>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonButton 
                    expand="block" 
                    color="success"
                  >
                    <IonIcon icon={checkmarkCircleOutline} slot="start" />
                    健康检查
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* 最后刷新时间 */}
        {lastRefresh && (
          <div className="last-refresh">
            <p>最后刷新: {lastRefresh.toLocaleString('zh-CN')}</p>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
