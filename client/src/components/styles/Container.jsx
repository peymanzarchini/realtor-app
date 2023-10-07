const Container = ({ children, classProps }) => {
  return <div className={`mx-auto max-w-[1120px] px-[2.4rem] ${classProps}`}>{children}</div>;
};
export default Container;
