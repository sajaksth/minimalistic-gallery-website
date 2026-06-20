import Link from "next/link"

// Hand-drawn divider line, matching the rest of the site.
function SketchLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={className}>
      <defs>
        <filter id="footerRough">
          <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        </filter>
      </defs>
      <path d="M2 6 H198" fill="none" stroke="currentColor" strokeWidth="2" filter="url(#footerRough)" />
    </svg>
  )
}

const footerLinks = {
  gallery: [
    { href: "/photos", label: "Photos" },
    { href: "/illustrations", label: "Illustrations" },
    { href: "/travel", label: "Travel" },
    { href: "/stories", label: "Stories" },
    { href: "/blog", label: "Blog" },
  ],
  shop: [
    { href: "/shop", label: "All Products" },
    { href: "/shop?category=prints", label: "Prints" },
    { href: "/shop?category=apparel", label: "Apparel" },
  ],
  info: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/shipping", label: "Shipping" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-white text-black">
      <SketchLine className="w-full h-3 text-black/20" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/images/barebone-logo.png"
                alt="Bare Bone Co."
                className="w-9 h-9 object-contain"
              />
              <span className="font-brush text-2xl">Bare Bone Co.</span>
            </Link>
            <p className="mt-4 text-sm text-black/55 leading-relaxed max-w-xs">
              A curated space for visual storytelling, sound, and creative expression.
            </p>
          </div>

          {/* Gallery Links */}
          <div>
            <h3 className="font-brush text-lg mb-4 text-black">Gallery</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.gallery.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-black/55 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-brush text-lg mb-4 text-black">Shop</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-black/55 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="font-brush text-lg mb-4 text-black">Information</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-black/55 hover:text-black transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16">
          <SketchLine className="w-full h-2.5 text-black/15" />
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-black/45">
              {new Date().getFullYear()} Bare Bone Co. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-xs text-black/45 hover:text-black transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-xs text-black/45 hover:text-black transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
