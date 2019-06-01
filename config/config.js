
// ========================
//  Port
// ========================
process.env.PORT = process.env.PORT || 3000;


// ========================
//  Environment
// ========================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// ========================
//  Token Expiration
// ========================
// 60 Seconds
// 60 Minutes
// 24 Hours
// 30 Days
process.env.EXPIRATION_TOKEN = '48h';


// ========================
//  SEED
// ========================
process.env.SEED =  process.env.SEED || 'this-is-the-seed';


// ========================
//  Database
// ========================
let urlDB = process.env.NODE_ENV === 'dev' ? 'mongodb://localhost:27017/marketplacer' : 'mongodb://cafe-user:JJrb333@ds127190.mlab.com:27190/cafe';

process.env.URLDB = urlDB;