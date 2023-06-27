import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Typography from "@mui/material/Typography";

const Logo = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Typography
      variant="h6"
      sx={{ color: "var(--black-color)", cursor: "pointer" }}
      onClick={scrollToTop}
    >
      <span
        className="logo-icon"
        style={{
          color: "var(--red-color)",
          padding: "10px 13px",
          backgroundColor: "var(--gray-color)",
          borderRadius: "50%",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ShoppingBasketIcon />
      </span>
      &nbsp;&nbsp;LEVI <span style={{ color: "var(--red-color)" }}>Market</span>
    </Typography>
  );
};

export default Logo;
