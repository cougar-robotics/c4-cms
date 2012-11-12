Migrations
==========

This project uses [node-migrate][] for migrations.

Like all migrations, running `migrate up` will migrate the db in order, while
`migrate down` will undo what `migrate up` did.

As new migrations are added, make sure to number them appropriately.

The specific format is as follows:

```javascript
var mongodb = require('mongodb');

exports.up = function(next){
  mongodb.rpush('pets', 'tobi');
  mongodb.rpush('pets', 'loki');
  mongodb.rpush('pets', 'jane', next);
};

exports.down = function(next){
  mongodb.rpop('pets');
  mongodb.rpop('pets', next);
};
```

[node-migrate]: https://github.com/visionmedia/node-migrate
