const express = require('express');
const cors = require('cors');
const productsRouter = require('./routes/products');
const leadsRouter = require('./routes/leads');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/products', productsRouter);
app.use('/leads', leadsRouter);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
