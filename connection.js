mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () => console.log('database is conneted'));
const conn =mongoose.connection;