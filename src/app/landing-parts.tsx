/**
 * The page is set as printed matter: a section is announced by a small caption
 * over a single hairline, and everything under it is carried by space rather
 * than by more rules. There is no rule per row, because a page where every line
 * is ruled has no structure at all — only noise.
 */

export function Section({
  label,
  id,
  children,
}: {
  label: string
  id?: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="pt-[72px] sm:pt-[104px]">
      <h2 className="label muted border-b border-rule pb-[10px]">{label}</h2>
      {children}
    </section>
  )
}

/** A step in a real sequence: the verbs carry the order, so nothing is numbered. */
export function Step({ label, body }: { label: string; body: string }) {
  return (
    <li>
      <h3 className="display-sm">{label}</h3>
      <p className="mt-[10px] muted">{body}</p>
    </li>
  )
}

export function Question({ question, answer }: { question: string; answer: string }) {
  return (
    <div className="border-b border-rule py-[22px] md:grid md:grid-cols-[minmax(0,30ch)_minmax(0,1fr)] md:gap-[40px]">
      <h3 className="font-medium">{question}</h3>
      <p className="mt-[6px] muted md:mt-0">{answer}</p>
    </div>
  )
}
