import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const port = 3000
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PasswordSchema = new mongoose.Schema({
  site: String,
  username: String,
  password: String,
});

const Password = mongoose.model('password', PasswordSchema);

app.get('/passwords', async (req, res) => {
  const data = await Password.find();
  res.json(data);
});

app.post('/passwords', async (req, res) => {
  const newPassword = new Password(req.body);
  await newPassword.save();
  res.json(newPassword);
});

app.delete('/passwords/:id', async (req, res) => {
  await Password.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});
app.put('/passwords/:id', async (req, res) => {
  await Password.findByIdAndUpdate(req.params.id, req.body);
  res.send({ success: true });
});


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})

