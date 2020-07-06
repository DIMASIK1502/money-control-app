import React, { useMemo, useState, useCallback } from "react";
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coordinate,
  Point,
  Interval,
  Interaction,
  Legend,
} from "bizcharts";
import { useSelector } from "react-redux";
import { Divider, Typography, Row, Col, Select, DatePicker } from "antd";
import groupBy from "lodash/groupBy";
import mapValues from "lodash/mapValues";
import values from "lodash/values";
import moment from "moment";
import { RootState } from "../../app/store";
import "antd/lib/divider/style/css";
import "antd/lib/date-picker/style/css";
import "./styles.scss";

const { Text, Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;


const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};


const defaultDate: [any, any] = [
  moment().startOf("month"),
  moment().add(1, "month").startOf("month"),
];

const renderPieLabel: [string, any] = [
  "money",
  (xValue: number) => {
    return {
      content: xValue + "₽",
    };
  },
];

export default function ChartsPage() {
  const expensesList = useSelector((state: RootState) => state.expenses.list);
  const [dateRange, setDateRange] = useState(defaultDate);
  const [filterBy, setFilterBy] = useState<string>("months");

  const onOk = useCallback((value) => {
    setDateRange(value);
  }, []);

  const onSelectInterval = useCallback(
    (value: string) => setFilterBy(value),
    []
  );

  const data = useMemo(() => {
    const filtered = expensesList.filter(
      (a) =>
        moment(a.date).isSameOrAfter(dateRange[0], "month") &&
        moment(a.date).isSameOrBefore(dateRange[1], "month")
    );
    filtered.sort(
      (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()
    );

    let groupFormat = "DD MMMM";

    switch (filterBy) {
      case "months":
        groupFormat = "MMMM";
        break;
      case "days":
        groupFormat = "DD MMMM";
        break;
    }
    const grouped = groupBy(filtered, (a) =>
      moment(a.date).format(groupFormat)
    );
    const withMax = mapValues(grouped, (value, key) => {
      const cateogies = groupBy(value, (a: Expense) => a.category.text);
      const cateogiesWithSum = values(
        mapValues(cateogies, (v: Expense[], k) => {
          return {
            sum: v.reduce((prev, cur) => prev + cur.money, 0),
            color: v[0].category.color,
            text: k,
          };
        })
      );
      return {
        sum: value.reduce((prev, cur) => prev + cur.money, 0),
        list: cateogiesWithSum,
        label: capitalizeFirstLetter(key),
      };
    });
    const result = values(withMax);
    return result;
  }, [dateRange, expensesList, filterBy]);

  const renderTooltip = useCallback((title, items) => {
    const data = items[0].data;
    return (
      <div className="tooltip-content">
        <div className="item-wrapper space-between">
          <Text className="content-label" strong>
            {title}
          </Text>
          <span className="content-money">{data.sum}₽</span>
        </div>
        <Divider className="divider" />
        <div className="content-category-list">
          {data.list.map((item: any, key: number) => (
            <div
              key={`${item.color}-${item.text}-${key}`}
              className="list-item"
            >
              <div className="item-wrapper">
                <div
                  style={{ backgroundColor: item.color }}
                  className="item-circle"
                ></div>
                <span className="item-label">{item.text}</span>
              </div>

              <span className="item-money">{item.sum}₽</span>
            </div>
          ))}
        </div>
      </div>
    );
  }, []);

  const pieData = useMemo(() => {
    const filtered = expensesList.filter(
      (a) =>
        moment(a.date).isSameOrAfter(dateRange[0], "month") &&
        moment(a.date).isSameOrBefore(dateRange[1], "month")
    );
    filtered.sort(
      (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()
    );
    const g = groupBy(filtered, (y: Expense) => y.category.text);
    const d = mapValues(g, (v: Expense[], key) => {
      return {
        color: v[0].category.color,
        money: v.reduce((prev, cur) => (prev += cur.money), 0),
        category: key,
      };
    });
    return values(d);
  }, [expensesList, dateRange]);

  const pieColors: [string, string[]] = useMemo(
    () => ["category", pieData.map((a) => a.color)],
    [pieData]
  );
  return (
    <div className="charts-page">
      <Title level={4}>График расходов</Title>
      <Row gutter={[16, 0]}>
        <Col span={12}>
          <Select
            value={filterBy}
            onSelect={onSelectInterval}
            defaultValue="months"
            className="w-100"
          >
            <Option value="months">По месяцам</Option>
            <Option value="days">По дням</Option>
          </Select>
        </Col>
        <Col span={12}>
          <RangePicker
            defaultValue={defaultDate}
            onChange={onOk}
            className="w-100"
            format="YYYY-MM-DD"
            allowClear={false}
          />
        </Col>
      </Row>
      <Chart
        padding={[40, 20, 20, 40]}
        autoFit
        width="100%"
        height={360}
        data={data}
      >
        <Geom
          tooltip={false}
          type="line"
          position="label*sum"
          size={2}
          color={"#1890ff"}
          shape={"smooth"}
        />
        <Point size={8} position="label*sum" />
        <Tooltip children={renderTooltip} />
      </Chart>
      <Divider />
      <Title level={4}>Расходы по категориям</Title>
      <Chart height={400} data={pieData} autoFit>
        <Coordinate type="theta" radius={0.75} />
        <Tooltip showTitle={false} />
        <Axis name="money" visible={false} />
        <Legend color={pieColors} position="right" name="category" />
        <Interval
          position="money"
          adjust="stack"
          label={renderPieLabel}
          color={pieColors}
        />
        <Interaction type="element-single-selected" />
      </Chart>
    </div>
  );
}
