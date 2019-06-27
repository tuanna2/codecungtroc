const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codecungtroc', {
    useNewUrlParser: true ,
    useCreateIndex: true
});

module.exports = mongoose;