"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderList = () => {
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path ? "text-primary font-semibold" : "text-text-primary font-medium";

  return (
    <ul className="flex items-center gap-x-10">
      <li>
        <Link href={"/"} className={`${isActive("/")}`}>
          Home
        </Link>
      </li>
      <li>
        <Link href={"/about-us"} className={`${isActive("/about-us")}`}>
          About-us
        </Link>
      </li>
      <li>
        <Link href={"/services"} className={`${isActive("/services")}`}>
          Services
        </Link>
      </li>
      <li>
        <Link href={"/contact-us"} className={`${isActive("/contact-us")}`}>
          Contact-us
        </Link>
      </li>
    </ul>
  );
};

export default HeaderList;
