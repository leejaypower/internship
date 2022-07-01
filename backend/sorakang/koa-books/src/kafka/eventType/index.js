const avro = require('avro-js');

const returnEventType = avro.parse({
  name: 'Return',
  type: 'record',
  fields: [
    { name: 'userId', type: 'int' },
    { name: 'returnDate', type: 'long', logicalType: 'timestamp-millis' },
    { name: 'rentalDate', type: 'long', logicalType: 'timestamp-millis' },
    { name: 'overdue', type: 'long' },
  ],
});

module.exports = { returnEventType };
