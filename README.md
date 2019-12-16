# wj-general-tools
A collection of common tools in a node environment

# Install

```node
$ npm install wj-general-tools
```

# Usage
> Use of JWT module

```node
const Tools = require('wj-general-tools');
const jwt = new Tools.Jwt(secret);
let token = jwt.createToken({uid: 123}, '10000');
res.send(token);
```

> Use of Logger module
```node
const Tools = require('wj-general-tools');
let config = {
        categories: "log_file",
        appenders: {
            type: "dateFile",
            filename: file,
        },
        level: "debug"
    };
const logger = new Tools.Logger(config);
logger.debug('this is debug info');
```

# Related Modules
+ [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) — JSON Web Token sign and verification
+ [log4js](https://log4js-node.github.io/log4js-node/) — Log debugging and output
+ [bluebird](http://bluebirdjs.com/docs/api-reference.html) — Promise using encapsulation
+ [redis](https://github.com/NodeRedis/node_redis) — Redis module using encapsulation
