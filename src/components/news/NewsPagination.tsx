type NewsPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function NewsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: NewsPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-2"
      aria-label="Pagination des actualités"
    >
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="tcgv-btn tcgv-btn--alt tcgv-focus px-5 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
      >
        Précédent
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (item) => (
          <button
            key={item}
            type="button"
            onClick={() => onPageChange(item)}
            aria-current={currentPage === item ? "page" : undefined}
            className={`tcgv-pill tcgv-focus transition-colors ${
              currentPage === item
                ? "tcgv-pill--primary pointer-events-none"
                : "tcgv-pill--muted hover:tcgv-pill--soft cursor-pointer"
            }`}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="tcgv-btn tcgv-btn--alt tcgv-focus px-5 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
      >
        Suivant
      </button>
    </nav>
  );
}
