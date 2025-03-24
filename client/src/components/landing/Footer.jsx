import React from "react";
import { Separator } from "../ui/separator";

export const FooterSection = () => {
  // Footer navigation data
  const footerSections = [
    {
      title: "About",
      links: [
        "About Karcis.com",
        "How it works",
        "Careers",
        "Press",
        "Blog",
        "Forum",
      ],
    },
    {
      title: "Partner with us",
      links: [
        "Partnership programs",
        "Affiliate program",
        "Connectivity partners",
        "Promotions and events",
        "Integrations",
        "Community",
        "Loyalty program",
      ],
    },
    {
      title: "Support",
      links: [
        "Help Center",
        "Contact us",
        "Privacy policy",
        "Terms of service",
        "Trust and safety",
        "Accessibility",
      ],
    },
    {
      title: "Get the app",
      links: ["Kahoot for Android", "Kahoot for iOS", "Mobile site"],
    },
  ];

  return (
    <footer className="w-full bg-[#4F4CEE] text-white py-4 flex flex-col items-start gap-[17px] mt-24">
      <div className="w-full flex items-start justify-between pt-[60px] pb-6 px-[120px]">
        {/* Brand Logo */}
        <div className="inline-flex items-start gap-2.5 px-3 py-4">
          <h2 className="font-bold text-5xl tracking-wider leading-1 font-[family-name:var(--font-geist-sans)]">
            Kahoot
          </h2>
        </div>

        {/* Navigation Columns */}
        {footerSections.slice(0, 3).map((section, index) => (
          <div
            key={index}
            className="flex flex-col w-[200px] items-start gap-2 pl-0 pr-4 py-4"
          >
            <div className="flex items-start gap-2.5 p-1 relative self-stretch w-full">
              <h3 className="flex-1 mt-[-1.00px] font-medium text-xl tracking-wide leading-1 font-[family-name:var(--font-geist-sans)]">
                {section.title}
              </h3>
            </div>

            {section.links.map((link, linkIndex) => (
              <div
                key={linkIndex}
                className="flex items-start gap-2.5 p-1 relative self-stretch w-full"
              >
                <a
                  href="#"
                  className="flex-1 mt-[-1.00px]  tracking-wide leading-[var(--body-text-medium-line-height)] font-[family-name:var(--font-geist-sans)]"
                >
                  {link}
                </a>
              </div>
            ))}
          </div>
        ))}

        {/* Get the app section with download buttons */}
        <div className="w-[200px] gap-3 flex flex-col items-start">
          <div className="flex flex-col w-[250px] items-start gap-2 pl-0 pr-4 py-4 mr-[-50.00px]">
            <div className="flex items-start gap-2.5 p-1 relative self-stretch w-full">
              <h3 className="flex-1 mt-[-1.00px] font-[family-name:var(--font-geist-sans)] font-body-subheading-01 font-[number:var(--body-subheading-01-font-weight)] text-[length:var(--body-subheading-01-font-size)] tracking-[var(--body-subheading-01-letter-spacing)] leading-[var(--body-subheading-01-line-height)] [font-style:var(--body-subheading-01-font-style)]">
                {footerSections[3].title}
              </h3>
            </div>

            {footerSections[3].links.map((link, linkIndex) => (
              <div
                key={linkIndex}
                className="flex items-start gap-2.5 p-1 relative self-stretch w-full"
              >
                <a
                  href="#"
                  className="flex-1 font-[family-name:var(--font-geist-sans)] mt-[-1.00px] font-body-text-medium font-[number:var(--body-text-medium-font-weight)] text-[length:var(--body-text-medium-font-size)] tracking-[var(--body-text-medium-letter-spacing)] leading-[var(--body-text-medium-line-height)] [font-style:var(--body-text-medium-font-style)]"
                >
                  {link}
                </a>
              </div>
            ))}
          </div>

          {/* App Store Button */}
          <div className="relative w-[135px] h-10 bg-textdefault rounded border border-solid border-[#a1a1a1]">
            <img
              className="absolute w-[30px] h-[30px] top-1 left-2"
              alt="Element apple mac"
              src="/24---apple-mac.svg"
            />
            <img
              className="absolute w-[75px] h-[7px] top-[7px] left-11"
              alt="Download on the"
              src="/download-on-the.svg"
            />
            <img
              className="absolute w-20 h-[17px] top-[18px] left-[43px]"
              alt="App store"
              src="/app-store.svg"
            />
          </div>

          {/* Google Play Button */}
          <div className="relative w-[135px] h-10 bg-[url(/link---google-play.png)] bg-cover bg-[50%_50%]" />
        </div>
      </div>

      {/* Divider */}
      <Separator className="w-full h-px bg-white/20" />

      {/* Footer Bottom */}
      <div className="flex h-16 items-center justify-between px-[120px] py-3 w-full">
        {/* Social Media Icons */}
        <div className="inline-flex items-start gap-5 p-2">
          <a href="#" aria-label="Twitter">
            <img className="w-6 h-6" alt="Twitter" src="/24---twitter.svg" />
          </a>
          <a href="#" aria-label="Instagram">
            <div className="relative w-6 h-6">
              <img
                className="absolute w-[22px] h-[22px] top-px left-px"
                alt="Instagram"
                src="/union.svg"
              />
            </div>
          </a>
          <a href="#" aria-label="Facebook">
            <img className="w-6 h-6" alt="Facebook" src="/24---facebook.svg" />
          </a>
        </div>

        {/* Copyright */}
        <p className="font-body-text-large font-[family-name:var(--font-geist-sans)] font-[number:var(--body-text-large-font-weight)] text-[length:var(--body-text-large-font-size)] text-right tracking-[var(--body-text-large-letter-spacing)] leading-[var(--body-text-large-line-height)] [font-style:var(--body-text-large-font-style)]">
          © 2025 Kahoot incorporated
        </p>
      </div>
    </footer>
  );
};
