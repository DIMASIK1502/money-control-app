import React, { useState, useCallback } from "react";
import { Button, Select, Tooltip, Row, Col } from "antd";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import CategoryModal from "../CategoryModal";
import "antd/lib/button/style/css";
import "antd/lib/select/style/css";
import "antd/lib/tooltip/style/css";
import "antd/lib/row/style/css";
import "antd/lib/col/style/css";

import "./styles.scss";

const Option = Select.Option;

interface Props {
  value?: string | number | undefined;
  onChange?: (value: any, options: any) => void;
}

const CategoryPicker = ({ onChange, value }: Props) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const onModalShow = useCallback(() => {
    setModalVisible(true);
  }, []);

  const onModalClose = useCallback(() => {
    setModalVisible(false);
  }, []);

  const categoryList = useSelector((state: RootState) => state.category.list);

  const renderOptionList = useCallback(() => {
    return categoryList.map((item: Category, index: number) => {
      const colorStyle = { backgroundColor: item.color };
      return (
        <Option
          value={item.id}
          label={item.text}
          key={`category-item-${index}`}
        >
          <div className="category-option-content">
            <div style={colorStyle} className="category-color"></div>
            <span className="category-text">{item.text}</span>
          </div>
        </Option>
      );
    });
  }, [categoryList]);
  return (
    <>
      <CategoryModal onClose={onModalClose} visible={modalVisible} />
      <div className="category-picker">
        <Row gutter={[8, 0]}>
          <Col flex="auto">
            <Select
              value={value}
              onSelect={onChange}
              placeholder="Выберите категорию"
              className="picker-select"
            >
              {renderOptionList()}
            </Select>
          </Col>
          <Col>
            <Tooltip title="Добавить категорию">
              <Button type="dashed" onClick={onModalShow}>
                <PlusOutlined />
              </Button>
            </Tooltip>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CategoryPicker;
