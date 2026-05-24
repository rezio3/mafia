import { Typography } from "@mui/material";

const Footer = () => {
  return (
    <div className="d-flex align-items-center mb-4 mt-3">
      <div className="decoration-gray-line" />
      <Typography className="text-center text-gray" style={{ fontSize: 12 }}>
        Poprowadź sojuszników do zwycięstwa
      </Typography>
      <div className="decoration-gray-line" />
    </div>
  );
};

export default Footer;
