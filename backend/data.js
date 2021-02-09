import bcrypt from 'bcryptjs'

const data = {
    users: [
        {
          name:'Dor',
          email:'dorgrosman@gmail.com',
          password: bcrypt.hashSync('12345', 8),
          isAdmin:true,
        },
        {
          name:'Zoe',
          email:'zoegrosman@gmail.com',
          password: bcrypt.hashSync('12345',8),
          isAdmin:false,
        }
    ],
    products: [
        {
            name: 'White T-shirt',
            category: 'Shirts',
            img: '../assets/img/whit-T-shirt.jpeg',
            price: 9.99,
            brand: 'Amazon',
            rating: 4.5,
            countInStock: 5,
            numReviews: 10,
            description: 'Very comfortable fabric'
        },
        {
            name: 'Buttoned shirt',
            category: 'Shirts',
            img: '../assets/img/Buttoned-shirt.jpeg',
            price: 19.5,
            brand: 'Primark',
            rating: 2.5,
            countInStock: 20,
            numReviews: 14,
            description: 'Very comfortable fabrice'
        },
        {
            name: 'Yello Dress',
            category: 'Dress',
            img: '../assets/img/yello-dress.jpeg',
            price: 29,
            brand: 'Amazon',
            rating: 5,
            countInStock: 2,
            numReviews: 10,
            description: 'Very comfortable fabric'
        },
        {
            name: 'Red-set.jpeg',
            category: 'Appliances',
            img: '../assets/img/red-set.jpeg',
            price: 35,
            brand: 'Amazon light',
            rating: 3.5,
            countInStock: 55,
            numReviews: 19,
            description: 'Very comfortable fabric'
        },
        {
            name: 'Indian Buttoned',
            category: 'Appliances',
            img: '../assets/img/Indiar-Buttoned.jpeg',
            price: 24.5,
            brand: 'Amazon Prime',
            rating: 5,
            countInStock: 10,
            numReviews: 12,
            description: 'Very comfortable fabric'
        },

    ]

}
export default data;