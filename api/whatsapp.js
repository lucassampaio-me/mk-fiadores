const numbers = ['5511944427758', '5511916751560'];

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const index = Math.floor(Math.random() * numbers.length);
  res.status(200).json({ phoneNumber: numbers[index] });
};



