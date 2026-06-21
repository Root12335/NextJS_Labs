import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import connectDB from '@/lib/db';
import Product from '@/lib/models/Product';
import mongoose from 'mongoose';

export const dynamic = 'force-dynamic';

const page = async ({ params }) => {
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        notFound();
    }
    
    let product = null;
    let errorMsg = null;
    try {
        await connectDB();
        product = await Product.findById(id).lean();
    } catch (error) {
        errorMsg = error.message;
    }
    
    if (errorMsg) {
        return (
            <div className="alert alert-danger">{errorMsg}</div>
        );
    }

    if (!product) {
        notFound();
    }
    
    return (
        <div className="card">
            <div className="card-header">
                Product Details
            </div>
            <div className="card-body">
                <div className="row">
                    {product.thumbnail && (
                        <div className="col-md-4">
                            <img src={product.thumbnail} alt={product.title} className="img-fluid rounded" />
                        </div>
                    )}
                    <div className="col-md-8">
                        <h5 className="card-title">{product.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{product.brand} - {product.category}</h6>
                        <p className="card-text">
                            <strong>Price:</strong> ${product.price} <br/>
                            <strong>Rating:</strong> {product.rating} ★
                        </p>
                        {product.description && (
                            <p className="card-text"><strong>Description:</strong> {product.description}</p>
                        )}
                        
                        {product.images && product.images.length > 0 && (
                            <div className="mt-3">
                                <h6>More Images:</h6>
                                <div className="d-flex gap-2 overflow-auto">
                                    {product.images.map((img, idx) => (
                                        <img key={idx} src={img} alt={`${product.title} ${idx}`} style={{ width: "100px", height: "100px", objectFit: "cover" }} className="rounded border" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Link href="/products" className="btn btn-secondary mt-3">
                    Back to Products
                </Link>
            </div>
        </div>
    );
};

export default page;
