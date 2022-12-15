export interface TMetric {
  event_category?: string;
  event_label?: string;
  value?: string;
}

export type TLocation = {
  hash: string;
  key: string;
  pathname: string;
  search: string;
  state: unknown;
};

export interface IGoogleAnalytic {
  location: TLocation;
  history: History;
}

export const sendMetrik = (action: string, category: string, label?: string, value?: string): void => {
  const values: TMetric = {};
  if (typeof category !== "undefined") {
    values.event_category = category;
  }
  if (typeof label !== "undefined") {
    values.event_label = label;
  }
  if (typeof value !== "undefined") {
    values.value = value;
  }
  if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
    window.gtag("event", action, values);
  } else {
    // на случай, если локально статистика отключена
  }
};
