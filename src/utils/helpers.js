export const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Simulasi validasi token
export const validateToken = (token) => {
  const storedToken = "generateJwtToken";
  return token === storedToken;
};
