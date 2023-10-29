const Container = ({ children, classProps }) => {
  return <div className={`mx-auto max-w-[1220px] px-[2.4rem] ${classProps}`}>{children}</div>;
};
export default Container;
