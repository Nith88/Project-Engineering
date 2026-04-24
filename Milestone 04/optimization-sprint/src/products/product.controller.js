import { getProducts, getProductById } from './product.service.js';

export async function listProducts(req, res) {
  try {
    const result = await getProducts(req.query);
    res.json(result);
  } catch (err) {
    // ✅ Handle bad input (400)
    if (err.message.includes("Invalid")) {
      return res.status(400).json({ error: err.message });
    }

    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export async function getProduct(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    const product = await getProductById(id);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}