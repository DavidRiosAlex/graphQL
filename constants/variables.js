
export const development = process.env.ENVIROMENT === 'development';

export const cors = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With, Token');
  if ('OPTIONS' == req.method) {
    return res.sendStatus(200);
  };
  next();
};
