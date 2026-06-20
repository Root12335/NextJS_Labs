import React, { useState, useMemo } from 'react';
import Link from 'next/link';

export async function getStaticProps() {
  const res = await fetch('https://dummyjson.com/products?limit=100');
  const data = await res.json();
  
  // Extract brands
  const brands = [...new Set(data.products.map(p => p.brand).filter(Boolean))];

  return {
    props: {
      products: data.products,
      brands
    }
  }
}

export default function Products({ products, brands }) {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Filter  sort products when products changes
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
    
    if (selectedBrand) {
      result = result.filter(p => p.brand === selectedBrand);
    }
    
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }
    
    return result;
  }, [products, selectedBrand, sortOption]);

  return (
    <div>
      <h1 className="mb-4">Products</h1>
      
      <div className="row mb-4">
        {/* Brand Filter */}
        <div className="col-md-6">
          <label className="form-label">Filter by Brand:</label>
          <select 
            className="form-select" 
            value={selectedBrand} 
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">All Brands</option>
            {brands.map((brand, idx) => (
              <option key={idx} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        <div className="col-md-6">
          <label className="form-label">Sort by:</label>
          <select 
            className="form-select" 
            value={sortOption} 
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-desc">Rating: Highest First</option>
          </select>
        </div>
      </div>
      
      <div className="row">
        {filteredAndSortedProducts.map(product => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card h-100">
              <img src={product.thumbnail} className="card-img-top" alt={product.title} style={{ height: '200px', objectFit: 'cover' }} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text text-muted">{product.brand}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                  <span className="fw-bold">${product.price}</span>
                  <span className="badge bg-warning text-dark">⭐ {product.rating}</span>
                </div>
                <Link href={`/products/${product.id}`} className="btn btn-primary mt-3">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
        {filteredAndSortedProducts.length === 0 && (
          <div className="col-12 text-center mt-5">
            <p className="text-muted">No products found for the selected criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
