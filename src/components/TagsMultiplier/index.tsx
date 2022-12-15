import React, { FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useField } from "formik";
import { Dropdown, Empty, Menu } from "antd";

import Button from "components/Buttons/Button";

import useOnClickOutside from "hooks/useOnClickOutside";


import { TagsMultiplierProps } from "./types";
import { MAX_TAGS_COUNT } from "./constants";

const TagsMultiplier: FC<TagsMultiplierProps> = ({
  tags, fieldName , options, disabled, name, setName
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [,, helpers] = useField(fieldName);
  const { setValue } = helpers;

  const handleClickAdd = () => {
    setName("");
    setValue([...tags, { name }]);
  };

  const handleChangeInput = (value: string) => {
    const punctuationLess = value.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g,"");
    const finalString = punctuationLess.replace(/\s{2,}/g,"");
    if (finalString.length <= 25) setName(finalString);
  };

  const handleClickClose = ($name: string) => {
    setValue([...tags.filter( tag => tag.name !== $name)]);
  };

  const includeInTags = !!tags.find(tag => tag.name === name);
  const addIsAvailable = tags.length < MAX_TAGS_COUNT;

  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useOnClickOutside({ ref: menuRef, handler: () => setVisible(false), clickedRef: inputRef });

  const filteredOptions = options.length > 0
    ? options.filter(option => option.name.toUpperCase().includes(name.toUpperCase()))
    : [];

  const menu = (
    <Menu className="tags-multiplier__menu">
      <div ref={menuRef}>
        {filteredOptions.length ? filteredOptions
          .map((option, index) => (
            <Menu.Item
              key={index}
              onClick={() => setName(option.name)}
            >
              {option.name}
            </Menu.Item>
          )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={<span>{t("naming.noData")}</span>} />}
      </div>
    </Menu>
  );

  const handleKeypress = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (e.charCode === 13) {
      handleClickAdd();
    } else {
      handleChangeInput(name + e.key);
    }
  };

  useEffect(() => {
    setVisible(false);
  }, []);


  return (
    <div className="tags-multiplier">
      <div className="tags-multiplier__input">
        <span className="tags-multiplier__counter">{ `${tags.length}/${MAX_TAGS_COUNT}` }</span>
        <Dropdown
          overlay={name ? menu : <></>}
          trigger={[]}
          placement="bottomLeft"
          visible={visible}
          disabled={disabled}
        >
          <input
            disabled={disabled}
            onKeyPress={handleKeypress}
            ref={inputRef}
            maxLength={25}
            placeholder={addIsAvailable ? t("tagsMultiplier.addTag") : t("tagsMultiplier.removeTagToAdd")}
            value={name}
            onFocus={() => setVisible(true)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChangeInput(e.target.value)}
          />
        </Dropdown>
        <Button
          onClick={handleClickAdd}
          title={t("action.add")}
          disabled={!addIsAvailable || includeInTags || !name || disabled}
          lettuce={true}
          className="tags-multiplier__add-btn"
        />
      </div>
      <div className="tags-multiplier__tags">
        {
          tags.map(tag => (
            <div key={tag.name} className="tags-multiplier__tag">
              { `#${tag.name}` }
              <span
                className="close"
                onClick={() => !disabled && handleClickClose(tag.name)}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default TagsMultiplier;