import "../styles/Shop.scss";
import NewItemButton from "../components/NewItemButton";

export default function Shop({ cart, handleCartControl, items }) {
  return (
    <main className="shop">
      {items.map((item) => {
        return (
          <div key={item.id} data-id={item.id} className="item">
            <div className="img-wrapper">
              <img src={item.image} alt={item.title} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.price}$</p>
            <NewItemButton
              cart={cart}
              id={item.id}
              handleCartControl={handleCartControl}
              removable="true"
            />
          </div>
        );
      })}
    </main>
  );
}
