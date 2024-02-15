const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const StoreItem = require('./models/storeItemModel');
const sequelize = require('./models/db');
const authenticateToken = require('./authenticateToken');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

// Sample database
const users = [
  { id: 1, username: 'user1', password: '$2b$10$GpRiL8.8b9Jx1RfLXYQ5/OMFiblYLd9Is7YOPiw3psHzO.yvU9HKu' } // hashed password: 'password'
];

// Routes for authentication
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (user && bcrypt.compareSync(password, user.password)) {
    const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '15m' });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
});

// Sample route for product details
app.get('/products', authenticateToken, (req, res) => {
  // Fetch and return product details from the database
  const products = [
    { id: 1, name: 'Product 1', price: 10, image: 'product1.jpg' },
    { id: 2, name: 'Product 2', price: 20, image: 'product2.jpg' }
    // Add more products as needed
  ];

  res.json(products);
});

app.get('/store_items', async (req, res) => {
  try {
    const storeItems = await StoreItem.findAll();
    const detailedItems = await Promise.all(storeItems.map(async (item) => {
      const { id, name, price, image_path } = item;
      // Fetch additional details for each item
      // Adjust this part based on your actual data structure and relationships
      const additionalDetails = await fetchAdditionalDetails(id);
      return { id, name, price, image_path, ...additionalDetails };
    }));
    res.json(detailedItems);
  } catch (error) {
    console.error('Error fetching store items:', error);
    res.status(500).send('Internal Server Error');
  }
});

async function fetchAdditionalDetails(itemId) {
  try {
    // Replace this with your actual logic to fetch additional details
    const response = await fetch(`http://localhost:5000/store_items/${itemId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching details for item ${itemId}:`, error);
    return {};
  }
}

app.get('/store_items/:id', async (req, res) => {
  const itemId = req.params.id;
  try {
    const storeItem = await StoreItem.findOne({ where: { id: itemId } });
    if (storeItem) {
      res.json(storeItem);
    } else {
      res.status(404).send('Store item not found');
    }
  } catch (error) {
    console.error('Error fetching store item:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
