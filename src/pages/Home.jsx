import { useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.scss";

export default function Home() {
  useEffect(() => {
    document.body.className = "blobs-active";

    return () => (document.body.classList = "");
  }, []);

  return (
    <main className="home">
      <div className="info">
        <div className="slogan">
          <h1>A Super Store</h1>
          <h1>for Super People</h1>
        </div>
        <button className="btn btn-shop-start">
          <Link to="/shop">Shop Now</Link>
        </button>
      </div>
    </main>
  );
}
