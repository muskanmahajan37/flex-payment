require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();

mongoose.connect(
  `mongodb+srv://rronjakupi:${process.env.MONGO_ATLASS_PW}@${process.env.DATABASE_NAME}-ny5dc.mongodb.net/test?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).json({
    api: 'v.1',
  });
});

app.use('/payments', require('./api/routes/PaymentRouter'));
app.use('/customers', require('./api/routes/CustomerRouter'));

const PORT = process.env.port || 8002;

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
