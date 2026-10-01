export function SiteFooter() {
  return (
    <footer className="site-footer bg-ocean-950 px-6 py-12 text-sand sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 border-b border-sand/10 pb-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-3xl">Buying for Good</p>
            <p className="mt-3 text-sm leading-6 text-sand/50">[Approved footer descriptor / slogan to be supplied.]</p>
          </div>
          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-4 text-sm text-sand/65">
            <a href="#become-part-of-it" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-sand/80">Become part of it</a>
            <a href="#expression-interest" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-sand/80">Expression of interest</a>
            <a href="#contact" className="focus:outline-none focus-visible:ring-2 focus-visible:ring-sand/80">Contact</a>
            <span className="text-sand/35">Privacy — placeholder</span>
            <span className="text-sand/35">Website Terms — placeholder</span>
          </nav>
        </div>
        <div className="flex flex-col gap-2 pt-7 text-[0.62rem] uppercase tracking-[0.18em] text-sand/32 sm:flex-row sm:justify-between">
          <span>Buying for Good</span>
          <span>[Copyright / legal entity details to be supplied.]</span>
        </div>
      </div>
    </footer>
  );
}
