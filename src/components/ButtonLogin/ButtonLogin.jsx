import { Button } from "@mui/material";
import "./ButtonLogin.css";

const ButtonLogin = (props) => {
  const { type, variant, fullWidth, onClick, color, backgroundColor, label } =
    props;
  return (
    <Button
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      onClick={() => onClick()}
      sx={{
        mt: 3,
        mb: 2,
        color: color,
        backgroundColor: backgroundColor,
      }}
    >
      {label}
    </Button>
  );
};

export default ButtonLogin;
