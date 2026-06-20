import { SectionHeader } from "@/components/section-header"

const travel = [
  { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80", title: "Golden Hour" },
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80", title: "Lakeside" },
  { src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80", title: "On the Road" },
  { src: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80", title: "Wander" },
  { src: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800&q=80", title: "Far Shores" },
  { src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80", title: "High Passes" },
]

export default function TravelPage() {
  return (
    <div className="bg-white text-foreground">
      <SectionHeader title="Travel" />
      <section className="bg-white px-6 pb-24 max-w-6xl mx-auto">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {travel.map((item) => (
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
