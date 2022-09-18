import React from "react";

import { Loading, Pages } from "../../components";
import { useAppDispatch, useAppSelector, useTitle } from "../../hooks";
import { setPage } from "./metaListSlice";

type PropsType<T> = {
  searchBar?: () => React.ReactElement;
  header?: () => React.ReactElement;
  footer?: () => React.ReactElement;
  perPage?: number;
  children: (items: T[]) => React.ReactElement;
  count?: number;
  listKey: string;
  items: T[] | undefined | null;
  title: string;
};

export default function MetaList<T>(props: PropsType<T>) {
  const { listKey, searchBar, children, header, count, perPage = 25, items, footer, title } = props;
  const page = useAppSelector((state) => state.metaList.pages[listKey] || 0);

  const dispatch = useAppDispatch();
  const doSetPage = (page: number) => dispatch(setPage({ key: listKey, page }));

  useTitle(title);

  return (
    <>
      {searchBar && searchBar()}

      {!items && <Loading expand />}
      {!!items && (
        <>
          {header && header()}
          {children(items)}
          {footer && footer()}
        </>
      )}

      <Pages count={count} perPage={perPage} page={page} setPage={doSetPage} />
    </>
  );
}
