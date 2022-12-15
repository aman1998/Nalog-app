import { FC } from "react";

import AssetNoteIcon from "components/Icons/AssetNoteIcon";

const AssetsNote: FC<{text: string}> = ({ text }) => (
  <div className='assets-note'>
    <div className='assets-note__icon-wrapper'>
      <AssetNoteIcon />
    </div>
    <p className='assets-note__text'>{text}</p>
  </div>
);

export default AssetsNote;
