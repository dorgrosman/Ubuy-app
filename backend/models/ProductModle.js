import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' },
    img: { type: String, required: true },
    category: { type: String, required: true },
    brand: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    numReviews: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    isFav: { type: Boolean, required: true },
},
    {
        timestamps: true,
    }
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
