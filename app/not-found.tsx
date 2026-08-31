export default function GlobalNotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-off-white px-6 py-24 text-center">
      <div className="mx-auto max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary">
          Error 404
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-dark sm:text-5xl">
          Esta página no existe
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-gray-600">
          Es posible que el enlace esté roto o que la página se haya movido.
        </p>
        <a
          href="/"
          className="mt-10 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 font-semibold text-white hover:bg-primary-dark"
        >
          Volver al inicio
        </a>
      </div>
    </section>
  );
}
