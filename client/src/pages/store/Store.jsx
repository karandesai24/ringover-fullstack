import "./store.scss";

import Filters from "../../components/filters/Filters";
import List from "../../components/list/List";
import Cart from "../../components/cart/Cart";

const Store = () => {
  return (
    <div className="store">
      <Filters className="filters" />
      <List className="list" />
      <Cart className="cart" />
    </div>
  );
};

export default Store;
