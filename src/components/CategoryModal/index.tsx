import React, { useState, useCallback, useEffect, ChangeEvent } from "react";
import { Modal, Input } from "antd";
import { useDispatch } from "react-redux";
import { addCategory } from "../../app/reducers/category";
import "antd/lib/modal/style/css";
import "antd/lib/input/style/css";

interface Props {
  visible?: boolean;
  onClose?: () => void;
}

export default function CategoryModal({ visible = false, onClose }: Props) {
  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState<string>("");
  const onCancel = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      setIsVisible(false);
    }
  }, [onClose]);

  const onOk = useCallback(() => {
    if (categoryName.length) {
      dispatch(addCategory(categoryName));
      setCategoryName("");
      onCancel();
    }
  }, [categoryName, dispatch, onCancel]);

  const onTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  }, []);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  return (
    <Modal
      title="Добавить категорию"
      visible={isVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <div>
        <Input
          onChange={onTextChange}
          value={categoryName}
          placeholder="Введите название категории"
        />
      </div>
    </Modal>
  );
}
