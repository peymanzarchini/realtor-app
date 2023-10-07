const FlexComponent = ({ children, classProps }) => {
  return <div className={`flex items-center justify-between ${classProps}`}>{children}</div>;
};

export default FlexComponent;
