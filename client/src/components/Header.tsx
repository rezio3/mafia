type HeaderPropsType = {
  children: React.ReactNode;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const Header: React.FC<HeaderPropsType> = ({ children, variant = "h2" }) => {
  const Tag = variant;
  return <Tag>{children}</Tag>;
};

export default Header;
