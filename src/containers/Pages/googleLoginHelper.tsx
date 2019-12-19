// Mobil hvis skærmstørrelsen er:
export const detectMobile = () => {
  if (window.innerWidth <= 600 && window.innerHeight <= 800) {
    return true;
  } else {
    return false;
  }
};
