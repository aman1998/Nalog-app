import React from "react";

import { TChildren } from "config/types";

import Sidebar from "./components/SettingsSidebar";

const SettingsPageWrapper: React.FC<{ children: TChildren }> = ({ children }) => (
  <section className="settings container">
    <Sidebar />
    <div className="settings-content">{children}</div>
  </section>
);

export default SettingsPageWrapper;
