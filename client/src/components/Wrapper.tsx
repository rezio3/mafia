type WrapperPropsType = {
  children: React.ReactNode;
};

const Wrapper: React.FC<WrapperPropsType> = ({ children }) => {
  return <div className="wrapper">{children}</div>;
};

export default Wrapper;
