import Link from "next/link"

// Hand-drawn divider line — a gently wobbly path (no filter, so it always renders).
function SketchLine({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 12" preserveAspectRatio="none" className={className}>
      <path
        d="M1 6 C 18 3.5, 34 8.5, 52 5.5 S 86 8, 104 6 S 150 3.5, 170 7 S 192 5, 199 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
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
    <footer className="bg-black text-white">
      <SketchLine className="w-full h-4 text-white/40" />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <img
                src="/images/barebone-logo.png"
                alt="Bare Bone Co."
                className="w-9 h-9 object-contain invert"
              />
              <span className="font-brush text-2xl">Bare Bone Co.</span>
            </Link>
            <p className="mt-4 text-sm text-white/55 leading-relaxed max-w-xs">
              A curated space for visual storytelling, sound, and creative expression.
            </p>
          </div>

          {/* Gallery Links */}
          <div>
            <h3 className="font-brush text-lg mb-4 text-white">Gallery</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.gallery.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/55 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-brush text-lg mb-4 text-white">Shop</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/55 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="font-brush text-lg mb-4 text-white">Information</h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/55 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16">
          <SketchLine className="w-full h-2.5 text-white/20" />
          <div className="mt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/45">
              {new Date().getFullYear()} Bare Bone Co. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-xs text-white/45 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-xs text-white/45 hover:text-white transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
