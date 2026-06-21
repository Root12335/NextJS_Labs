import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

const seedProducts = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/nextjs-day2");
    console.log("Connected to MongoDB");

    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    
    // Map data to our schema
    const productsToInsert = data.products.map((p) => ({
      title: p.title,
      price: p.price,
      description: p.description,
      brand: p.brand,
      category: p.category,
      thumbnail: p.thumbnail,
      rating: p.rating,
      images: p.images,
    }));

    await Product.deleteMany({}); // Clear existing products
    await Product.insertMany(productsToInsert);
    
    console.log(`Successfully seeded ${productsToInsert.length} products`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
};

seedProducts();
