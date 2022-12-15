import React, { useState, useEffect } from "react";
import cn from "classnames";

import { TCryptoProps } from "./types";

const CryptoIcon: React.FC<TCryptoProps> = ({ asset, className, isExternalType }) => {
  const [icon, setIcon] = useState<string>('');

  useEffect(() => {
    let isSubscribed = true;

    const handleDynamicIcon = async () => {
      try {
        let importedIcon;
        if(isExternalType) {
          importedIcon = await import(`common/assets/icons/black-crypto-icons/${asset?.toLowerCase()}.svg`);
        }
        if(!isExternalType) importedIcon = await import(`common/assets/icons/crypto-icons/${asset?.toLowerCase()}.svg`);
        if (isSubscribed) {
          setIcon(importedIcon.default);
        }
      }
      catch {
        const importedIcon = await import("common/assets/icons/unknown-asset.svg");
        if (isSubscribed) {
          setIcon(importedIcon.default);
        }

      }
    };

    // tslint:disable-next-line:no-console
    handleDynamicIcon().catch(console.error);

    return () => {
      isSubscribed = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asset]);

  return (
    <>
      {
        icon ?
          <img className={cn("crypto-icon", className, {
            isExternalCryptoIcon: isExternalType
          })} alt='crypto-icon' src={ icon }/> :
          <div className="crypto-icon" />
      }
    </>
  );
};

export default CryptoIcon;
