type Tile = { src: string; alt?: string; caption?: string; focus?: string };

function Photo({ tile, big }: { tile: Tile; big?: boolean }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[4px] ${
        big ? "col-span-2 row-span-2" : ""
      }`}
    >
      {tile.src && (
        // eslint-disable-next-line @next/next/no-img-element -- hỗ trợ ảnh blob cục bộ
        <img
          src={tile.src}
          alt={tile.alt ?? ""}
          className="block h-full w-full object-cover"
          style={{ objectPosition: tile.focus ?? "center" }}
        />
      )}
      {tile.caption && (
        <div
          className={`absolute inset-x-0 bottom-0 text-white ${
            big
              ? "tpl-heading px-3 py-2.5 text-base italic"
              : "px-2 py-1 text-[10px]"
          }`}
          style={{ background: "color-mix(in srgb, var(--tpl-dark) 62%, transparent)" }}
        >
          {tile.caption}
        </div>
      )}
    </div>
  );
}

/** Ô ghép to–nhỏ: một ảnh lớn chiếm 2×2 và hai ảnh nhỏ bên cạnh, mỗi ảnh có chú thích. */
export default function MosaicGallery({
  main,
  small,
}: {
  main: Tile;
  small: [Tile, Tile];
}) {
  return (
    <div className="grid aspect-[350/248] w-full grid-cols-3 grid-rows-2 gap-2">
      <Photo tile={main} big />
      <Photo tile={small[0]} />
      <Photo tile={small[1]} />
    </div>
  );
}
