import logo from "../assets/Blue Space-logo/vector/default-monochrome.svg";

function BrandLogo({ className = "h-8 w-auto" }) {
  return <img src={logo} alt="Blue Space" className={className} />;
}

export default BrandLogo;
