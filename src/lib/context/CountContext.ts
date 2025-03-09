import {createContext} from "react";

export const CountContext = createContext<
  [number, React.Dispatch<React.SetStateAction<number>>]
>([0, () => {}]);
