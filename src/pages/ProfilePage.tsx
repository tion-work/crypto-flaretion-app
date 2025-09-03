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
  IonAvatar,
  IonItemDivider,
  IonToggle,
  IonSelect,
  IonSelectOption,
  IonModal,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import {
  personOutline,
  settingsOutline,
  barChartOutline,
  notificationsOutline,
  downloadOutline,
  syncOutline,
  trashOutline,
  cardOutline,
  arrowUpOutline,
  documentTextOutline,
  helpCircleOutline,
  chatbubbleOutline,
  bugOutline,
  starOutline,
  timeOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import './ProfilePage.css';

const ProfilePage: React.FC = () => {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // 模拟用户数据
  const userData = {
    name: '张三',
    email: 'user@example.com',
    subscription: 'professional',
    expiryDate: '2024-12-31',
    activeStrategies: 3,
    todaySignals: 5,
    totalSignals: 1247,
    winRate: 78
  };

  const subscriptionPlans = [
    {
      name: '免费版',
      price: '免费',
      features: ['基础RSI分析', '3个策略限制', '基础提醒'],
      current: false
    },
    {
      name: '专业版',
      price: '$9/月',
      features: ['多周期RSI共振', '无限策略', '高级提醒', '策略回测'],
      current: true
    },
    {
      name: '高级版',
      price: '$29/月',
      features: ['AI参数优化', '链上数据', '社区策略库', '优先客服'],
      current: false
    }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>个人中心</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* 用户信息区域 */}
        <IonCard>
          <IonCardContent>
            <div className="user-profile">
              <IonAvatar className="user-avatar">
                <IonIcon icon={personOutline} />
              </IonAvatar>
              <div className="user-info">
                <h2>{userData.name}</h2>
                <p>{userData.email}</p>
                <IonChip color="primary">
                  <IonIcon icon={starOutline} />
                  <IonLabel>专业版用户</IonLabel>
                </IonChip>
              </div>
            </div>
            
            <IonGrid>
              <IonRow>
                <IonCol size="6">
                  <div className="user-stat">
                    <div className="stat-value">{userData.activeStrategies}</div>
                    <div className="stat-label">活跃策略</div>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div className="user-stat">
                    <div className="stat-value">{userData.todaySignals}</div>
                    <div className="stat-label">今日信号</div>
                  </div>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="6">
                  <div className="user-stat">
                    <div className="stat-value">{userData.totalSignals}</div>
                    <div className="stat-label">总信号数</div>
                  </div>
                </IonCol>
                <IonCol size="6">
                  <div className="user-stat">
                    <div className="stat-value">{userData.winRate}%</div>
                    <div className="stat-label">胜率</div>
                  </div>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCardContent>
        </IonCard>

        {/* 功能管理 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>⚙️ 功能管理</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem button>
                <IonIcon icon={barChartOutline} slot="start" />
                <IonLabel>
                  <h3>我的策略</h3>
                  <p>管理我的所有策略</p>
                </IonLabel>
              </IonItem>
              <IonItem button>
                <IonIcon icon={barChartOutline} slot="start" />
                <IonLabel>
                  <h3>数据统计</h3>
                  <p>查看使用统计和收益</p>
                </IonLabel>
              </IonItem>
              <IonItem button>
                <IonIcon icon={notificationsOutline} slot="start" />
                <IonLabel>
                  <h3>通知设置</h3>
                  <p>配置推送和提醒</p>
                </IonLabel>
              </IonItem>
              <IonItem button>
                <IonIcon icon={downloadOutline} slot="start" />
                <IonLabel>
                  <h3>数据管理</h3>
                  <p>导入导出和同步</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* 订阅管理 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>💳 订阅管理</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonIcon icon={cardOutline} slot="start" />
                <IonLabel>
                  <h3>当前订阅</h3>
                  <p>专业版 (到期: {userData.expiryDate})</p>
                </IonLabel>
                <IonChip color="success" slot="end">
                  <IonIcon icon={checkmarkCircleOutline} />
                  <IonLabel>活跃</IonLabel>
                </IonChip>
              </IonItem>
              <IonItem button onClick={() => setShowUpgradeModal(true)}>
                <IonIcon icon={arrowUpOutline} slot="start" />
                <IonLabel>
                  <h3>升级订阅</h3>
                  <p>升级到高级版</p>
                </IonLabel>
              </IonItem>
              <IonItem button>
                <IonIcon icon={documentTextOutline} slot="start" />
                <IonLabel>
                  <h3>支付记录</h3>
                  <p>查看支付历史</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* 应用设置 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>🔧 应用设置</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
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
                <IonLabel>语言设置</IonLabel>
                <IonSelect value="zh-CN" placeholder="选择语言">
                  <IonSelectOption value="zh-CN">中文</IonSelectOption>
                  <IonSelectOption value="en-US">English</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonIcon icon={timeOutline} slot="start" />
                <IonLabel>时区设置</IonLabel>
                <IonSelect value="Asia/Shanghai" placeholder="选择时区">
                  <IonSelectOption value="Asia/Shanghai">北京时间</IonSelectOption>
                  <IonSelectOption value="UTC">UTC</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* 帮助支持 */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>🆘 帮助支持</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem button>
                <IonIcon icon={helpCircleOutline} slot="start" />
                <IonLabel>
                  <h3>使用指南</h3>
                  <p>新手教程和功能说明</p>
                </IonLabel>
              </IonItem>
              <IonItem button>
                <IonIcon icon={chatbubbleOutline} slot="start" />
                <IonLabel>
                  <h3>联系客服</h3>
                  <p>在线客服和问题反馈</p>
                </IonLabel>
              </IonItem>
              <IonItem button>
                <IonIcon icon={bugOutline} slot="start" />
                <IonLabel>
                  <h3>问题反馈</h3>
                  <p>报告问题和建议</p>
                </IonLabel>
              </IonItem>
            </IonList>
          </IonCardContent>
        </IonCard>

        {/* 升级订阅模态框 */}
        <IonModal isOpen={showUpgradeModal} onDidDismiss={() => setShowUpgradeModal(false)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>升级订阅</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowUpgradeModal(false)}>关闭</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonCard>
              <IonCardHeader>
                <IonCardTitle>选择订阅计划</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {subscriptionPlans.map((plan, index) => (
                  <IonCard key={index} className={`subscription-plan ${plan.current ? 'current' : ''}`}>
                    <IonCardContent>
                      <div className="plan-header">
                        <h3>{plan.name}</h3>
                        <div className="plan-price">{plan.price}</div>
                        {plan.current && (
                          <IonChip color="success">
                            <IonIcon icon={checkmarkCircleOutline} />
                            <IonLabel>当前计划</IonLabel>
                          </IonChip>
                        )}
                      </div>
                      <IonList>
                        {plan.features.map((feature, featureIndex) => (
                          <IonItem key={featureIndex}>
                            <IonIcon icon={checkmarkCircleOutline} slot="start" color="success" />
                            <IonLabel>{feature}</IonLabel>
                          </IonItem>
                        ))}
                      </IonList>
                      {!plan.current && (
                        <IonButton expand="block" color="primary">
                          选择此计划
                        </IonButton>
                      )}
                    </IonCardContent>
                  </IonCard>
                ))}
              </IonCardContent>
            </IonCard>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
