import React from 'react';
import Link from 'next/link';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';

export const dynamic = 'force-dynamic';

const page = async () => {
    let products = [];
    let errorMsg = null;
    try {
        await connectDB();
        products = await Product.find({}).lean();
    } catch (error) {
        errorMsg = error.message;
    }
    
    return (
        <div>
            <h1>Products</h1>
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            {products.length === 0 ? (
                <p>No products available. Add some via POST /api/products.</p>
            ) : (
                <div className="row g-3">
                    {products.map(product => (
                        <div key={product._id.toString()} className="col-md-4">
                            <div className="card h-100">
                                {product.thumbnail && (
                                    <img src={product.thumbnail} className="card-img-top" alt={product.title} style={{ height: "200px", objectFit: "contain" }} />
                                )}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{product.brand} - {product.category}</h6>
                                    <p className="card-text">
                                        <strong>${product.price}</strong> 
                                        <span className="ms-2 badge bg-warning text-dark">★ {product.rating}</span>
                                    </p>
                                    <div className="mt-auto">
                                        <Link href={`/products/${product._id.toString()}`} className="btn btn-primary w-100">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default page;