type WrapperPropsType = {
  children: React.ReactNode;
  className?: string;
};

const Wrapper: React.FC<WrapperPropsType> = ({ children, className = "" }) => {
  return <div className={`wrapper ${className}`}>{children}</div>;
};

export default Wrapper;
