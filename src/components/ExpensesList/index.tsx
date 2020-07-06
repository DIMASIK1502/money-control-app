import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { List } from "antd";
import { RootState } from "../../app/store";
import ExpesnseCreate from "../ExpensesCreate";
import ExpensesItem from "./ExpensesItem";
import ExprenseEdit from "./ExpesnseEdit";

import "antd/lib/list/style/css";

export default function ExpensesList() {
  const dataSource = useSelector((state: RootState) => state.expenses.list);
  const renderItem = useCallback(
    (item: Expense) => (
      <ExpensesItem data={item} key={`expense-list-item-${item.id}`} />
    ),
    []
  );

  return (
    <>
      <List
        dataSource={dataSource}
        renderItem={renderItem}
        header={<ExpesnseCreate />}
        bordered
      />
      <ExprenseEdit />
    </>
  );
}
