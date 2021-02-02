const createError = require('http-errors');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Role = require('./models/role.model.js');
const port = process.env.PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000',
};
app.use(cors(corsOptions));
app.use(express.json());

// use express router
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/drink.routes')(app);

// set up mongodb connection with mongoose
(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.log('error: ' + err);
  }
})();

const db = mongoose.connection;

// initialize database with Role documents
db.once('open', () => {
  console.log('MongoDB database connection established succesfully');
  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: 'user',
        }).save((err) => {
          if (err) {
            console.log('error', err);
          }

          console.log("added 'user' to roles collection");
        });

        new Role({
          name: 'admin',
        }).save((err) => {
          if (err) {
            console.log('error', err);
          }

          console.log("added 'admin' to roles collection");
        });
      }
    });
  }
  initial();
});

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`server is now listening on port ${port}`);
});
