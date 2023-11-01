export const setHeaders = (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "https://realtor-estate.onrender.com");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
};
