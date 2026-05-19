type EyebrowProps = {
  num: string;
  label: string;
};

/**
 * Eyebrow — small mono-font section label styled as a shell `cd` command.
 * Renders: `$ cd ./{num}-{label}` with the `$` and path in red, `cd` in white.
 */
export function Eyebrow({ num, label }: EyebrowProps) {
  const slug = label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="inline-flex items-center gap-3 font-mono text-[11px] text-zinc-500 mb-5">
      <span className="text-[#DC2626] font-bold">$</span>
      <span className="text-white">cd</span>
      <span className="text-[#DC2626]">
        ./{num}-{slug}
      </span>
    </div>
  );
}
