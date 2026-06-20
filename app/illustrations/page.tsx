import { SectionHeader } from "@/components/section-header"

const illustrations = [
  { src: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&q=80", title: "Paper Birds" },
  { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80", title: "Study in Ink" },
  { src: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800&q=80", title: "Linework I" },
  { src: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800&q=80", title: "Quiet Forms" },
  { src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80", title: "Bloom" },
  { src: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80", title: "Texture Notes" },
]

export default function IllustrationsPage() {
  return (
    <div className="bg-white text-foreground">
      <SectionHeader title="Illustrations" />
      <section className="bg-white px-6 pb-24 max-w-6xl mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {illustrations.map((item) => (
            <figure key={item.src} className="mb-5 break-inside-avoid">
              <img src={item.src} alt={item.title} className="w-full rounded-lg object-cover" />
              <figcaption className="mt-1.5 font-brush text-sm text-black/55">{item.title}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  )
}
