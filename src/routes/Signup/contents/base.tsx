export function SignUpContentSection({
  children,
  className,
}: React.ComponentPropsWithoutRef<"section">) {
  return (
    <section className={`p-3 flex items-center ${className}`}>
      <div className="w-full">{children}</div>
    </section>
  );
}

export function SectionTitle({
  children,
}: React.ComponentPropsWithoutRef<"h2">) {
  return <h2 className="text-2xl font-bold">{children}</h2>;
}
