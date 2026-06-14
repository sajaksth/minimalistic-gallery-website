import Link from "next/link"

const footerLinks = {
  gallery: [
    { href: "/photos", label: "Photos" },
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
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="font-serif text-2xl font-medium tracking-wide"
            >
              BareBone
            </Link>
            <p className="mt-4 text-sm text-background/70 leading-relaxed max-w-xs">
              A curated space for visual storytelling, sound, and creative expression.
            </p>
          </div>

          {/* Gallery Links */}
          <div>
            <h3 className="text-xs uppercase tracking-widest mb-4 text-background/50">
              Gallery
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.gallery.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-xs uppercase tracking-widest mb-4 text-background/50">
              Shop
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info Links */}
          <div>
            <h3 className="text-xs uppercase tracking-widest mb-4 text-background/50">
              Information
            </h3>
            <ul className="flex flex-col gap-3">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/50">
            {new Date().getFullYear()} BareBone. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-xs text-background/50 hover:text-background transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-background/50 hover:text-background transition-colors"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
