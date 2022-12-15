import React, { FC } from "react";
import cn from 'classnames';
import { useTranslation } from "react-i18next";

import SearchIcon from "components/Icons/SearchIcon";


import { ISearchInputProps } from "./types";

const SearchInput: FC<ISearchInputProps> = ({ setSearch, className }) => {
  const { t } = useTranslation();
  return (
    <div className={cn("search-wrapper", className)}>
      <input
        placeholder={t('action.search')}
        className="search-input"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
      <div>
        <SearchIcon />
      </div>
    </div>
  );};

export default SearchInput;
