import React from 'react';
import Link from 'next/link';

export async function getStaticPaths() {
  const res = await fetch('https://dummyjson.com/products?limit=100');
  const data = await res.json();
  
  const paths = data.products.map(product => ({
    params: { id: product.id.toString() }
  }));

  return {
    paths,
    fallback: false 
  };
}

// Fetch a single product's data 
export async function getStaticProps({ params }) {
  const res = await fetch(`https://dummyjson.com/products/${params.id}`);
  const product = await res.json();

  return {
    props: {
      product
    }
  };
}

export default function ProductDetails({ product }) {
  return (
    <div className="container mt-5 mb-5">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link href="/products">Products</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
        </ol>
      </nav>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <img src={product.thumbnail} alt={product.title} className="img-fluid rounded border w-100" />
          <div className="d-flex mt-3 gap-2 overflow-auto pb-2">
             {product.images?.map((img, idx) => (
                <img key={idx} src={img} alt={`${product.title} ${idx}`} style={{ width: '80px', height: '80px', objectFit: 'cover' }} className="rounded border flex-shrink-0" />
             ))}
          </div>
        </div>
        <div className="col-md-6">
          <h1 className="display-5 fw-bold">{product.title}</h1>
          <h4 className="text-muted">{product.brand}</h4>
          
          <div className="d-flex align-items-center mt-3 mb-4">
            <h2 className="text-success mb-0 me-3">${product.price}</h2>
            <span className="badge bg-warning text-dark fs-6">⭐ {product.rating} / 5</span>
          </div>
          
          <p className="lead">{product.description}</p>
          
          <hr />
          
          <div className="row mb-3">
             <div className="col-sm-4 fw-bold">Category</div>
             <div className="col-sm-8 text-capitalize">{product.category}</div>
          </div>
          <div className="row mb-3">
             <div className="col-sm-4 fw-bold">Stock</div>
             <div className="col-sm-8">{product.stock} units available</div>
          </div>
        </div>
      </div>
    </div>
  );
}
