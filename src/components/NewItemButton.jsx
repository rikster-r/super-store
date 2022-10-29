export default function NewItemButton({
  cart,
  id,
  handleCartControl,
  removable,
}) {
  const handleClick = (e) => {
    const id = Number(e.target.closest("[data-id]").dataset.id);
    handleCartControl(id, e.target.dataset.effect);
  };

  if (cart.get(id) === undefined || cart.get(id).count === 0) {
    return (
      <div className="item-control">
        <button
          onClick={handleClick}
          data-effect="add"
          className="btn btn-item-control"
        >
          Add to cart
        </button>
      </div>
    );
  } else {
    return (
      <div className="item-control vertical">
        {removable === "false" && cart.get(id).count === 1 ? (
          <button className="btn btn-item-control" disabled>
            -
          </button>
        ) : (
          <button
            onClick={handleClick}
            data-effect="decrease"
            className="btn btn-item-control"
          >
            -
          </button>
        )}
        <span>{cart.get(id).count}</span>
        <button
          onClick={handleClick}
          data-effect="increase"
          className="btn btn-item-control"
        >
          +
        </button>
      </div>
    );
  }
}
