const express = require('express')
const app = express()
const PORT = process.env.PORT || 3081;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

