import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

type TProps = {
  expand?: boolean;
};

export function Loading({ expand }: TProps) {
  const { t } = useTranslation(["translation"]);

  if (expand) {
    return (
      <div className="spinner-expanded">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t("translation:loading")}</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Spinner animation="border" role="status">
      <span className="visually-hidden">{t("translation:loading")}</span>
    </Spinner>
  );
}
