import { createContext, useContext } from "react";

export const NavLayoutContext = createContext({
  isDesktopNavOpen: true,
  toggleDesktopNav: () => {},
  setDesktopNavOpen: () => {},
});

export function useNavLayout() {
  return useContext(NavLayoutContext);
}
