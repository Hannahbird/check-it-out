const express = require('express');
const pino = require('pino');
const expressPino = require('pino-http');
const logger = pino(); 
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const StoreItem = require('./models/storeItemModel');
const sequelize = require('./models/db');
const User = require('./models/user');
const Cart = require('./models/cart');
// const authenticateToken = require('./authenticateToken');
const bcrypt = require('bcrypt');
const axios = require('axios'); 

const app = express();
app.use(expressPino({ logger }));
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


app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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

app.get('/store_items', async (req, res) => {
  try {
    const storeItems = await StoreItem.findAll();
    const detailedItems = await Promise.all(storeItems.map(async (item) => {
      const { id, name, price, image_path } = item;
      const additionalDetails = await fetchAdditionalDetailsWithAxios(id);
      return { id, name, price, image_path, ...additionalDetails };
    }));
    res.json(detailedItems);
  } catch (error) {
    console.error('Error fetching store items:', error);
    res.status(500).send('Internal Server Error');
  }
});

async function fetchAdditionalDetailsWithAxios(itemId) {
  try {
    const response = await axios.get(`http://localhost:5000/store_items/${itemId}`);
    return response.data;
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

app.post('/add-to-cart', async (req, res) => {
  const { itemId, quantity } = req.body;
  const userAgent = req.get('User-Agent');
  const clientIP = req.ip; 

  try {
    const [cartItem, created] = await Cart.findOrCreate({
      where: { client_identifier: userAgent || clientIP, item_id: itemId },
      defaults: { quantity },
    });

    if (!created) {
      await Cart.update({ quantity }, { where: { client_identifier: userAgent || clientIP, item_id: itemId } });
    }

    const updatedCartItem = await Cart.findOne({
      where: { client_identifier: userAgent || clientIP, item_id: itemId },
      include: [{ model: StoreItem }],
    });

    res.status(200).json(updatedCartItem); 
  } catch (error) {
    console.error('Error adding item to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});

app.get('/cart', async (req, res) => {
  const clientIdentifier = req.get('User-Agent') || req.ip;

  try {
    const cartItems = await Cart.findAll({
      where: { client_identifier: clientIdentifier },
      include: [{ model: StoreItem }],
    });

    res.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' }); 
  }
});

app.delete('/clear-cart', async (req, res) => {
  const clientIdentifier = req.get('User-Agent') || req.ip;

  try {
    await Cart.destroy({ where: { client_identifier: clientIdentifier } });

    res.status(204).send();
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.delete('/remove-from-cart/:itemId', async (req, res) => {
  const itemId = req.params.itemId;

  try {
    await Cart.destroy({ where: { id: itemId } });

    res.status(200).send('Item removed from cart');
  } catch (error) {
    console.error('Error removing item:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/update-cart-item/:itemId', async (req, res) => {
  const itemId = req.params.itemId;
  const newQuantity = req.body.quantity;

  try {
    const updatedCartItem = await Cart.update(
      { quantity: newQuantity },
      { where: { id: itemId } }
    );

    res.status(200).json(updatedCartItem);
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.use((err, req, res, next) => {
  logger.error(err); 
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});