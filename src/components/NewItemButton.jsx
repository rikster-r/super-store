export default function NewItemButton({ cart, item, removable, cartDispatch }) {
  if (cart.get(item.id) === undefined || cart.get(item.id).count === 0) {
    return (
      <div className="item-control">
        <button
          onClick={() => cartDispatch({ type: 'add', item })}
          className="btn btn-item-control"
        >
          Add to cart
        </button>
      </div>
    );
  } else {
    return (
      <div className="item-control vertical">
        <button
          onClick={() => {
            const type = cart.get(item.id).count === 1 ? 'remove' : 'decrease';
            cartDispatch({ type, item });
          }}
          className="btn btn-item-control"
          disabled={cart.get(item.id).count === 1 && !removable}
        >
          -
        </button>
        <span>{cart.get(item.id).count}</span>
        <button
          onClick={() => cartDispatch({ type: 'increase', item })}
          className="btn btn-item-control"
        >
          +
        </button>
      </div>
    );
  }
}
