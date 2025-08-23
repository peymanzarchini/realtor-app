import { twMerge } from "tailwind-merge";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
} & React.HTMLAttributes<HTMLElement>;

const Contaienr = ({ children, className, as: Component = "div", ...rest }: ContainerProps) => {
  const baseClasses = "sm:container mx-auto px-5";

  const mergedClasses = twMerge(baseClasses, className);

  return (
    <Component className={mergedClasses} {...rest}>
      {children}
    </Component>
  );
};

export default Contaienr;
