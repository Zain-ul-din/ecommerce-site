import { useContext } from "react";
import { cartContext } from "../../Hooks/Context";

export default function Cart() {
  const cart = useContext(cartContext);

  return <> Cart </>;
}
