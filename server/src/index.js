const express = require('express');
const cors = require('cors');
const { PORT } = require('./config/constants');
const productsRouter = require('./routes/products');
const leadsRouter = require('./routes/leads');
const contentRouter = require('./routes/content');
const pageConfigRouter = require('./routes/page-config');
const requestId = require('./middlewares/request-id');
const notFound = require('./middlewares/not-found');
const errorHandler = require('./middlewares/error-handler');
const logger = require('./utils/logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestId);
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    logger.info('request', {
      requestId: req.requestId,
      method: req.method,
      path: req.path,
      statusCode: res.statusCode,
      durationMs: Date.now() - start
    });
  });
  next();
});

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/products', productsRouter);
app.use('/leads', leadsRouter);
app.use('/', contentRouter);
app.use('/', pageConfigRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  logger.info('server_started', { url: `http://localhost:${PORT}` });
});
