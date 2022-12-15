import { DatePicker } from "antd";
import cn from "classnames";
import { FC } from "react";
import { RangePickerProps } from "antd/es/date-picker";
import localeEn from "antd/es/date-picker/locale/en_US";
import localeRu from "antd/es/date-picker/locale/ru_RU";
import { useTranslation } from "react-i18next";

import { ELanguages } from "../../i18n/constants";

const RangeDatePicker: FC<RangePickerProps> = ({ className, ...rest }) => {
  const { RangePicker: AntdRangePicker } = DatePicker;
  const { i18n } = useTranslation();

  return (
    <AntdRangePicker
      allowEmpty={[true, true]}
      className={cn("date-picker", className)}
      locale={i18n.language === ELanguages.enUS ? localeEn : localeRu}
      format={"DD.MM.YYYY"}
      {...rest}
    />
  );
};

export default RangeDatePicker;
