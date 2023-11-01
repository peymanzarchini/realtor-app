import { Link } from "react-router-dom";

const Links = () => {
  const footerLinks = [
    { display: "About us", href: "#" },
    { display: "Careers", href: "#" },
    { display: "Accessibility", href: "#" },
    { display: "Feedback", href: "#" },
    { display: "Media room", href: "#" },
    { display: "Ad Choices", href: "#" },
    { display: "Advertise with us", href: "#" },
    { display: "Agent support", href: "#" },
    { display: "Privacy", href: "#" },
    { display: "Terms", href: "#" },
    { display: "Home Made", href: "#" },
    { display: "Tech Blog", href: "#" },
    { display: "Agent Blog", href: "#" },
    { display: "Sitemap", href: "#" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      {footerLinks.map((item, index) => (
        <Link key={index} to={item.href} className="text-white text-base hover:text-red-600">
          {item.display}
        </Link>
      ))}
    </div>
  );
};

export default Links;
