import { useTranslation } from "react-i18next";

import { useTitle } from "../../hooks";

export default function Root() {
  const { t } = useTranslation(["root"]);

  useTitle(t("root:title"));

  return (
    <div>
      <p>TODO: Inhalte für die Einstiegsseite</p>
    </div>
  );
}
