const winston = require('winston');

// Create a logger
const logger = winston.createLogger({
  level: 'info', // Log level
  format: winston.format.json(), // Log format
  transports: [
    // Console transport
    new winston.transports.Console(),
    // File transport
    new winston.transports.File({ filename: 'logfile.log' }),
  ],
});


let cust_details = [["John","Kate","Ross","Joseph","Maria","Christina","Jim","Dan","Emma","Elijah"],
["Doe","Smith","Taylor","Anderson","Martinex","Johnson","Walker","Williams","Turner","Foster"],
["Miami","Houston","Los Angeles","North Dakota","Chicago","Dallas","Denver","Atlanta","San Francisco","New York"]]

for (const [index, firstname] of cust_details[0].entries()) {
    const lastname = cust_details[1][index];
    const city = cust_details[2][index];
    logger.info(firstname+" "+lastname+", "+city);
}