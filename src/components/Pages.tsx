import _ from "lodash";
import { Pagination } from "react-bootstrap";

type PropsType = {
  page: number;
  count?: number;
  perPage?: number;
  setPage: (page: number) => void;
  bridge?: number;
};

const getStartPage = (page: number, bridge: number, totalPages: number): number => {
  if (page === 0 || page < (bridge - 1) / 2) return 0;

  if (page + bridge >= totalPages) {
    if (totalPages - bridge + 1 < 0) return 0;
    return totalPages - bridge + 1;
  }

  return Math.floor(page - (bridge - 2) / 2);
};

const getNoPages = (startPage: number, bridge: number, totalPages: number) => {
  if (startPage + bridge > totalPages) return totalPages - startPage + 1;
  return bridge;
};

export function Pages({ page, count, perPage = 25, setPage, bridge = 10 }: PropsType) {
  if (!count) return null;

  const prevPage = page === 0 ? 0 : page - 1;
  const totalPages = Math.ceil(count < perPage ? 0 : count / perPage - 1);
  const nextPage = page === totalPages ? totalPages : page + 1;

  const startPage = getStartPage(page, bridge, totalPages);
  const noPages = getNoPages(startPage, bridge, totalPages);

  return (
    <Pagination className="ACD-pagination">
      <Pagination.First disabled={page <= 0} onClick={() => setPage(0)} />
      <Pagination.Prev disabled={page <= 0} onClick={() => setPage(prevPage)} />

      {startPage !== 0 && <Pagination.Ellipsis disabled />}

      {_.times(noPages, (currentPage) => (
        <Pagination.Item
          key={currentPage}
          active={startPage + currentPage === page}
          onClick={() => setPage(startPage + currentPage)}
        >
          {startPage + currentPage + 1}
        </Pagination.Item>
      ))}

      {startPage + noPages < totalPages && <Pagination.Ellipsis disabled />}

      <Pagination.Next disabled={page >= totalPages} onClick={() => setPage(nextPage)} />
      <Pagination.Last disabled={page >= totalPages} onClick={() => setPage(totalPages)} />
    </Pagination>
  );
}
