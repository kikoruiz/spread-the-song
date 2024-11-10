export default function SongCardSkeleton() {
  return (
    <div
      aria-hidden
      className="flex basis-full w-full gap-4 p-4 rounded-xl bg-gradient-to-tr from-pink-300 to-pink-100 relative before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-pink-100/60 before:to-transparent isolate overflow-hidden shadow-xl shadow-black/5 before:border-t before:border-pink-50"
    >
      <div className="overflow-hidden aspect-square basis-full max-w-40 rounded bg-pink-50/75" />

      <section className="flex flex-col gap-2 text-xl text-transparent leading-none">
        <div className="w-48 rounded text-3xl bg-pink-50/75">Name</div>
        <div className="w-2/3 rounded bg-pink-50/75">Artist Name</div>
        <div className="w-2/3 rounded bg-pink-50/75">Album Name</div>
      </section>
    </div>
  )
}
