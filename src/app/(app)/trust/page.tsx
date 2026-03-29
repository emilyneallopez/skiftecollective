import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust & Safety | Skifte Collective",
};

export default function TrustPage() {
  return (
    <div className="px-4 pt-8 pb-24 max-w-lg mx-auto">
      <div className="mb-8">
        <h1 className="font-heading text-3xl text-[#3B1F0E] mb-2">A safe space for every mom. 🌿</h1>
        <p className="font-body text-sm text-[#3B1F0E]/60 leading-relaxed">
          Skifte was built by moms, for moms. We take safety seriously — not with fine print, but with real care.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {[
          {
            emoji: "✅",
            title: "Verified community",
            body: "Every member is a real person. We verify accounts and keep the community family-focused. You'll never feel like you're meeting a stranger — you're meeting a neighbor.",
          },
          {
            emoji: "🤝",
            title: "Swap safely",
            body: "Meet in public places, use our in-app chat to coordinate, and rate every swap. Our community holds itself accountable — and we back that up.",
          },
          {
            emoji: "🔒",
            title: "Private by design",
            body: "Your personal info stays yours. Only your first name and neighborhood are visible to other moms. No address, no last name, no surprises.",
          },
          {
            emoji: "💛",
            title: "A community, not a marketplace",
            body: "Skifte isn't about transactions. It's about relationships. We care more about the connection you make than the item you swap.",
          },
        ].map((item, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 border border-[#E5D5BD]">
            <div className="flex items-start gap-4">
              <span className="text-2xl mt-0.5">{item.emoji}</span>
              <div>
                <h3 className="font-heading text-base text-[#3B1F0E] mb-1">{item.title}</h3>
                <p className="font-body text-sm text-[#3B1F0E]/60 leading-relaxed">{item.body}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#FAF5EF] rounded-2xl p-6 border border-[#E5D5BD]">
        <h2 className="font-heading text-xl text-[#3B1F0E] mb-4">Community guidelines</h2>
        <div className="space-y-3">
          {[
            "Be kind. Every mom here is doing her best.",
            "Describe your items honestly. Good karma is real.",
            "Meet in public places for swaps. Coffee shops, parks, library lobbies.",
            "If something feels off, report it. We take every report seriously.",
            "Don't resell items you got here at a markup. That's not the vibe.",
          ].map((rule, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="font-heading text-sm text-[#C96A3A] mt-0.5">{i + 1}.</span>
              <p className="font-body text-sm text-[#3B1F0E]/70 leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
