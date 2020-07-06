import React, { lazy, Suspense } from "react";
import { Tabs, Spin } from "antd";
import "antd/lib/tabs/style/css";
import "antd/lib/spin/style/css";

import "./styles.scss";

const { TabPane } = Tabs;

const ExpensesList = lazy(() => import("../../components/ExpensesList"));
const ChartsPage = lazy(() => import("../ChartsPage"));

const FallBack = () => (
  <div className="page-preloader">
    <Spin tip="Загрузка..."></Spin>
  </div>
);

export default function index() {
  return (
    <div className="expenses-page">
      <div className="container">
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span>Управление</span>} key="1">
            <Suspense fallback={<FallBack />}>
              <ExpensesList />
            </Suspense>
          </TabPane>
          <TabPane tab={<span>Статистика</span>} key="2">
            <Suspense fallback={<FallBack />}>
              <ChartsPage />
            </Suspense>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}
