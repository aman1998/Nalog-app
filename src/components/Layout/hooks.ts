import { createContext, useContext } from "react";

export const LayoutAppNameContext = createContext<{name?: string, logo?: JSX.Element}>({});

export const useLayoutAppNameContext = (): {name?: string, logo?: JSX.Element} => useContext(LayoutAppNameContext);
