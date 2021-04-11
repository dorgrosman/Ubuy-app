import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import { isAuth, isAdmin ,isSellerOrAdmin} from '../utils.js';
import Product from './../models/ProductModle.js';

const ProductRouter = express.Router();

ProductRouter.get('/', expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const seller = req.query.seller || '';
    const nameFilter = name ? { name:{$regex: name, $options:'i'}} : {};
    const sellerFilter = seller ? { seller } : {};
    const products = await Product.find({ ...sellerFilter, ...nameFilter}).populate(
        'seller',
        'seller.name seller.logo'
      );
    res.send(products)
}));

ProductRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        await Product.remove({});
        const createdProducts = await Product.insertMany(data.products);
        res.send({ createdProducts });
    })
);

ProductRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({ message: 'Product not found' })
    }
}))

ProductRouter.post(
    '/',
    isAuth,
    // isAdmin,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name: 'sample name ', // + Date.now(),//
            seller: req.user._id,
            img: '../assets/img/whit-T-shirt.jpeg',
            price: 0,
            category: 'sample category',
            brand: 'sample brand',
            countInStock: 0,
            rating: 0,
            numReviews: 0,
            description: 'sample description',
            isFav:false,
        });
        const createdProduct = await product.save();
        res.send({ message: 'Product Created', product: createdProduct });
    })
);

ProductRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    console.log('product:', product)
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.img = req.body.img;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.brand = req.body.brand;
        product.description = req.body.description;
        product.isFav = req.body.isFav;
        const productUpdate = await product.save();
        res.send({ message: 'Product Update', product: productUpdate })
    } else {
        res.status(404).send({ message: 'Product Not Found' })

    }
}))

ProductRouter.delete(
    '/:id',
    isAuth,
    // isAdmin,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id).populate(
            'seller',
            'seller.name seller.logo seller.rating seller.numReviews'
          );
        if (product) {
            const deleteProduct = await product.remove();
            res.send({ message: 'Product Deleted', product: deleteProduct });
        } else {
            res.status(404).send({ message: 'Product Not Found' });
        }
    })
);

export default ProductRouter;