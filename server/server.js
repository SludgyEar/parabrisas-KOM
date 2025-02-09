const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    res.json({ "users": ["userOne", "userTwo", "userThree", "userFour", "userFive"] });
});

PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`Server started on ${PORT}`); });