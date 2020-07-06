import React, { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, DatePicker, InputNumber, Button } from "antd";
import { addExpense } from "../../app/reducers/expenses";
import CategoryPicker from "../CategoryPicker";
import { moneyFormatter, moneyParser } from "../../utils/money";
import moment from "moment";
import "antd/lib/date-picker/style/css";
import "antd/lib/row/style/css";
import "antd/lib/col/style/css";
import "antd/lib/input-number/style/css";

import "./styles.scss";
import { RootState } from "../../app/store";

//d+((.|,)d+)?
//.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export default function ExpensesCreate() {
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState<number>();
  const [money, setMoney] = useState<number>(0);
  const [date, setDate] = useState(null);

  const onPickerChange = useCallback((value: number, options: any) => {
    setCategoryId(value);
  }, []);

  const onInputNumber = useCallback((value): void => {
    setMoney(value);
  }, []);

  const onChangeDate = useCallback((value) => setDate(value), []);

  const isValid = useMemo(() => categoryId && money > 0 && date, [
    money,
    categoryId,
    date,
  ]);

  const categoryList = useSelector((state: RootState) => state.category.list);

  const onExpensesCreate = useCallback(() => {
    if (isValid) {
      const category = categoryList.find((a) => a.id === categoryId);
      const expense = {
        date: moment(date).format(),
        money,
        category: category,
      };
      if (category) {
        dispatch(addExpense(expense));
      }
    }
  }, [date, money, categoryId, isValid, categoryList, dispatch]);

  return (
    <div className="expenses-create">
      <Row gutter={[20, 16]}>
        <Col span={12}>
          <CategoryPicker value={categoryId} onChange={onPickerChange} />
        </Col>
        <Col span={12}>
          <DatePicker
            value={date}
            onChange={onChangeDate}
            className="date-picker"
            placeholder="Выберите дату и время"
            showTime
          />
        </Col>
      </Row>
      <Row gutter={[16, 0]}>
        <Col span={18}>
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
        <Col span={6}>
          <Button
            disabled={!isValid}
            onClick={onExpensesCreate}
            className="create-btn"
            type="primary"
          >
            Добавить
          </Button>
        </Col>
      </Row>
    </div>
  );
}
