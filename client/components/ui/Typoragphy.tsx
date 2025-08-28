import React from "react";
import { twMerge } from "tailwind-merge";

export type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "overline";

const variantClasses: Record<TypographyVariant, string> = {
  h1: "text-5xl font-extrabold tracking-tight lg:text-6xl",
  h2: "text-4xl font-bold tracking-tight lg:text-5xl",
  h3: "text-3xl font-bold tracking-tight lg:text-4xl",
  h4: "text-2xl font-bold tracking-tight",
  h5: "text-xl font-bold tracking-tight",
  h6: "text-lg font-bold tracking-tight",
  subtitle1: "text-lg font-medium",
  subtitle2: "text-base font-medium",
  body1: "text-base font-normal",
  body2: "text-sm font-normal",
  caption: "text-xs font-normal text-slate-500",
  overline: "text-xs font-semibold uppercase tracking-wider text-slate-500",
};

const variantMapping: Record<TypographyVariant, React.ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6", // Subtitles are often semantically h6
  subtitle2: "p",
  body1: "p",
  body2: "p",
  caption: "span",
  overline: "span",
};

type TypographyOwnProps<T extends React.ElementType = "p"> = {
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
  as?: T;
};

type TypographyProps<T extends React.ElementType> = TypographyOwnProps<T> &
  Omit<React.ComponentPropsWithoutRef<T>, keyof TypographyOwnProps<T>>;

export const Typography = <T extends React.ElementType = "p">({
  as,
  variant = "body1",
  children,
  className,
  ...rest
}: TypographyProps<T>) => {
  const Component = as || variantMapping[variant] || "p";

  const mergedClasses = twMerge(variantClasses[variant], className);

  return (
    <Component className={mergedClasses} {...rest}>
      {children}
    </Component>
  );
};
