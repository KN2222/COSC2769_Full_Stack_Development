import { NavLink, useParams } from "react-router-dom";
import { useGetProducts } from "../../api/getProducts";

import { Link } from "react-router-dom";
import { SkeletonProductDetail } from "../loading/SkeletonProductDetail";

export default function ProductDetail() {
  const { productId } = useParams();
  const { data: products, loading } = useGetProducts(productId);

  if (loading) {
    return <SkeletonProductDetail />;
  }

  const product = products[0]; // Since useGetProducts now returns an array

  return (
    <div className="container mt-4 w-50">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item ">
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Home{" "}
            </Link>
          </li>
          <Link
            style={{ textDecoration: "none" }}
            className="breadcrumb-item active "
            aria-current="page"
            onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
            onMouseOut={(e) => (e.target.style.textDecoration = "none")}
          >
            {product.category}
          </Link>
        </ol>
      </nav>
      <div className="row mt-5">
        <div className="col-md-4">
          <img src={product.image} alt={product.title} className="img-fluid" />
        </div>
        <div className="col-md-8 text-center">
          <h2 className="fw-bold">{product.title}</h2>
          <div className="w-75 mx-auto ">
            <p className="fs-6 fw-normal">{product.description}</p>
          </div>
          <p className="fs-6 fw-normal text-primary">
            Price:  ${product.price}
          </p>
          <button className="btn btn-primary mt-3">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
