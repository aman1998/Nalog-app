import { FC } from "react";

import DefaultDocIcon from "components/Icons/DocTypesIcons/DefaultDocIcon";

import colorHash from "utils/colorHash";

const FormedDefaultDocIcon: FC<{name: string}> = ({ name }) => {
  const theme = {
    fontSize: name.length < 5 ? '8px' : '6px',
    TextAlign: 'center',
    lineHeight: '12px',
    backgroundColor: colorHash(name).hex
  };

  const getName = () => {
    if (name.length > 7) {
      return name.slice(0,5) + '...';
    }
    return name;
  };

  return <div className="default-doc-icon">
    <DefaultDocIcon />
    <div style={theme} className="default-doc-icon name">{getName()}</div>
  </div>;
};

export default FormedDefaultDocIcon;