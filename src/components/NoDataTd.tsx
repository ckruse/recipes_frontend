import { useState } from "react";

import clsx from "clsx";
import { useTranslation } from "react-i18next";

interface PropsInterface {
  data?: any[];
  className?: string;
}

export function NoDataTd({ data, className }: PropsInterface) {
  const { t } = useTranslation(["translation"]);
  const [ref, setRef] = useState<HTMLTableRowElement | null>(null);

  if (!!data?.length) return null;

  const cols = ref?.closest("table")?.querySelectorAll("thead > tr > th").length || 1;

  return (
    <tr className={clsx("no-data", className)} ref={(node) => setRef(node)}>
      <td colSpan={cols}>{t("translation:no_data")}</td>
    </tr>
  );
}
