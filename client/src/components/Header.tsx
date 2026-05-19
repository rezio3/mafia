type HeaderPropsType = {
  children: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
};

const Header: React.FC<HeaderPropsType> = ({
  children,
  variant = "h2",
  className = "",
}) => {
  const Tag = variant;
  return <Tag className={className}>{children}</Tag>;
};

export default Header;
