export const navbarData = {
  logoBlack: "/black-gold.png",
  logoWhite: "/white-gold.png",

  navItems: [
    { label: "Home", href: "/" },
    { label: "Charter", href: "/charter" },
    { label: "Empty-Leg", href: "/empty-leg" },
    { label: "Aircrafts", href: "/aircrafts" },
    {
      label: "About",
      dropdown: [
        { label: "Our Company", href: "/about#company" },
        { label: "Aircraft Acquisition", href: "/about#aircraft-acquisition" },
        { label: "Operator", href: "/about#operator" },
      ],
    },

    { label: "Contact", href: "/contact" },
  ],

  currencySwitcher: {
    items: [
      { code: "USD", symbol: "$" },
      { code: "NGN", symbol: "₦" },
    ],
    default: "USD",
  },

  ctaButton: {
    text: "Request Quote",
    href: "/charter",
  },
};
