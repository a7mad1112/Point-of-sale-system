import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Typography from "@mui/material/Typography";

const Logo = () => {
  return (
    <Typography variant="h6" sx={{ color: "var(--black-color)" }}>
      <span
        className="logo-icon"
        style={{
          color: "var(--red-color)",
          padding: "10px 15px",
          backgroundColor: "var(--gray-color)",
          borderRadius: "50%",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)", 
          display: "inline-flex", 
          alignItems: "center", 
          justifyContent: "center",
          fontSize: "35px", 
        }}
      >
        <ShoppingBasketIcon />
      </span>
      &nbsp;&nbsp;LEVI <span style={{ color: "var(--red-color)" }}>Market</span>
    </Typography>
  );
};

export default Logo;
