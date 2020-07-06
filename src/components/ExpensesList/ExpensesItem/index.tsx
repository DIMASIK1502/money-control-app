import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { removeExpense, showEditModal } from "../../../app/reducers/expenses";
import { List, Row, Col, Tooltip, Typography, Popconfirm, Button } from "antd";
import { CalendarOutlined, ClockCircleOutlined } from "@ant-design/icons";

import moment from "moment";
import "antd/lib/row/style/css";
import "antd/lib/col/style/css";
import "antd/lib/typography/style/css";
import "antd/lib/popconfirm/style/css";
import "./styles.scss";

const ListItem = List.Item;
const Text = Typography.Text;

interface Props {
  data: Expense;
}

export default function ExpensesItem(props: Props) {
  const dispatch = useDispatch();
  const colorStyle = { backgroundColor: props.data.category.color };
  const date = moment(props.data.date).format("YYYY.MM.DD");
  const hours = moment(props.data.date).format("hh:mm");
  const onEditExpense = () => dispatch(showEditModal(props.data.id));
  const onConfirm = useCallback(() => {
    dispatch(removeExpense(props.data.id));
  }, [props.data.id, dispatch]);

  return (
    <ListItem
      actions={[
        <Button
          type="link"
          className="item-action-btn"
          onClick={onEditExpense}
          key="list-loadmore-edit"
        >
          Редактировать
        </Button>,
        <Popconfirm
          title="Вы действительно хотите удалить?"
          onConfirm={onConfirm}
          okText="Да"
          cancelText="Нет"
        >
          <Button
            type="link"
            className="item-action-btn"
            key="list-loadmore-more"
          >
            Удалить
          </Button>
        </Popconfirm>,
      ]}
    >
      <div className="list-item-content">
        <Tooltip title={`Категория: ${props.data.category.text}`}>
          <div style={colorStyle} className="item-category-circle"></div>
        </Tooltip>
        <Row className="item-info">
          <Col span={12}>
            <span className="item-money">{props.data?.money} ₽</span>
          </Col>
          <Col span={12}>
            <div className="item-date">
              <CalendarOutlined color="#1890ff" />
              <Text className="date-text" strong>
                {date}
              </Text>
              <ClockCircleOutlined color="#1890ff" />
              <Text className="date-text" strong>
                {hours}
              </Text>
            </div>
          </Col>
        </Row>
        <div></div>
      </div>
    </ListItem>
  );
}
