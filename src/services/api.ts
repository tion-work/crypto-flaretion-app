// API服务 - 用于连接Gin后端
// 从环境变量获取API地址
const API_BASE_URL = import.meta.env.API_BASE_URL || 'http://localhost:8000';

export interface KlineData {
  symbol: string;
  interval: string;
  open_time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  data_source: string;
}

export interface TradingSignal {
  id: number;
  symbol: string;
  signal_type: string;
  signal_strength: number;
  price: number;
  timestamp: string;
  strategy: string;
}

export interface MarketState {
  symbol: string;
  market_state: string;
  last_analysis: string;
  volatility: number;
  trend_direction: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // 获取K线数据
  async getKlineData(symbol: string, interval: string, limit: number = 100): Promise<KlineData[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('获取K线数据失败:', error);
      throw error;
    }
  }

  // 获取交易信号
  async getTradingSignals(symbol: string, limit: number = 50): Promise<TradingSignal[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/signals?symbol=${symbol}&limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('获取交易信号失败:', error);
      throw error;
    }
  }

  // 获取市场状态
  async getMarketState(symbol: string): Promise<MarketState[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/market-state?symbol=${symbol}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('获取市场状态失败:', error);
      throw error;
    }
  }

  // 获取系统状态
  async getSystemStatus(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/status`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('获取系统状态失败:', error);
      throw error;
    }
  }

  // 获取策略数据
  async getStrategies(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/strategies`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('获取策略数据失败:', error);
      throw error;
    }
  }

  // 获取分析结果
  async getAnalysis(): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/api/analysis`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      return result.data || result;
    } catch (error) {
      console.error('获取分析结果失败:', error);
      throw error;
    }
  }

  // 测试连接
  async testConnection(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`);
      return response.ok;
    } catch (error) {
      console.error('连接测试失败:', error);
      return false;
    }
  }
}

export const apiService = new ApiService();
export default ApiService;
