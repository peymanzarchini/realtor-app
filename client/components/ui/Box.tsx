import { twMerge } from "tailwind-merge";

type BoxOwnProps<T extends React.ElementType = "div"> = {
  /**
   * The HTML element to render.
   * @default 'div'
   */
  as?: T;
  children?: React.ReactNode;
  className?: string;
};

type BoxProps<T extends React.ElementType> = BoxOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof BoxOwnProps<T>>;

const Box = <T extends React.ElementType = "div">({
  as,
  children,
  className,
  ...rest
}: BoxProps<T>) => {
  const Component = as || "div";
  const baseClasses = "max-w-screen-xl mx-auto";

  const mergedClasses = twMerge(baseClasses, className);

  return (
    <Component className={mergedClasses} {...rest}>
      {children}
    </Component>
  );
};

export default Box;
