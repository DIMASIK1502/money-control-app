import React, { useState, useCallback, useEffect } from "react";
import { Modal, InputNumber, DatePicker, Row, Col } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { editExpense, closeEditModal } from "../../../app/reducers/expenses";
import { RootState } from "../../../app/store";
import { moneyFormatter, moneyParser } from "../../../utils/money";
import CategoryPicker from "../../CategoryPicker";
import moment from "moment";

import "antd/lib/modal/style/css";
import "antd/lib/row/style/css";
import "antd/lib/col/style/css";
import "./styles.scss";

export default function ExpenseEdit() {
  const dispatch = useDispatch();
  const editModal = useSelector((state: RootState) => state.expenses.editModal);
  const categoryList = useSelector((state: RootState) => state.category.list);
  const currentExpesnse = useSelector(
    (state: RootState) => state.expenses.currentExpesnse
  );
  const [money, setMoney] = useState<number>(
    currentExpesnse ? currentExpesnse.money : 0
  );
  const [date, setDate] = useState<Date | string>();

  const [category, setCategory] = useState<number | undefined>(
    currentExpesnse ? currentExpesnse.category.id : undefined
  );
  const onPickerChange = useCallback((value: number, options: any) => {
    setCategory(value);
  }, []);
  const onChangeDate = useCallback((value) => setDate(value), []);

  const onInputNumber = useCallback((value): void => {
    setMoney(value);
  }, []);

  const onCancel = useCallback(() => {
    dispatch(closeEditModal());
  }, [dispatch]);

  const onOk = useCallback(() => {
    const newCategory = categoryList.find((c) => c.id === category);
    if (currentExpesnse && newCategory && date && money > 0) {
      const expense: Expense = {
        category: newCategory,
        money,
        date,
        id: currentExpesnse.id,
      };
      dispatch(editExpense(expense));
      dispatch(closeEditModal());
    }
  }, [currentExpesnse, categoryList, money, date, category, dispatch]);

  useEffect(() => {
    if (currentExpesnse) {
      setMoney(currentExpesnse.money);
      setCategory(currentExpesnse.category.id);
      setDate(currentExpesnse.date);
    }
  }, [currentExpesnse]);

  return (
    <Modal
      visible={editModal}
      className="expense-edit-modal"
      title="Редактирование"
      onOk={onOk}
      onCancel={onCancel}
    >
      <div className="modal-content">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <DatePicker
              value={moment(date)}
              defaultValue={moment(currentExpesnse?.date)}
              onChange={onChangeDate}
              className="date-picker"
              placeholder="Выберите дату и время"
              showTime
            />
          </Col>
          <Col span={12}>
            <CategoryPicker value={category} onChange={onPickerChange} />
          </Col>
          <Col span={24}>
            <InputNumber
              decimalSeparator="."
              className="input-money"
              defaultValue={0}
              min={0}
              step={0.1}
              value={money}
              onChange={onInputNumber}
              formatter={moneyFormatter}
              parser={moneyParser}
            />
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
