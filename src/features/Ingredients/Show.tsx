import { useQuery } from "@apollo/client";

import { Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import { selectSession } from "../../App/sessionSlice";
import { CancelButton, EditButton, Loading } from "../../components";
import { INGREDIENT_QUERY } from "../../graphql/ingredients";
import { useAppSelector, useTitle } from "../../hooks";
import may from "../../permissions";
import { IIngredientQueryResult } from "../../types";
import { editIngredientPath, ingredientsPath } from "../../urls";
import { calories } from "../../utils";
import { formatIntNumberRounded, formatNumber } from "../../utils/numbers";

export default function Show() {
  const { id } = useParams<"id">();
  const { t } = useTranslation(["ingredients", "translation"]);
  const { data } = useQuery<IIngredientQueryResult>(INGREDIENT_QUERY, { variables: { id } });
  const { user } = useAppSelector(selectSession);

  useTitle(t("ingredients:show.title", { name: data?.ingredient.name || "…" }));

  if (!data?.ingredient) {
    return <Loading expand />;
  }

  return (
    <>
      <h1>{t("ingredients:show.title", { name: data.ingredient.name || "…" })}</h1>

      <Row>
        <Form.Label htmlFor="reference" as={Col} md={2}>
          {t("ingredients:fieldnames.reference")}
        </Form.Label>
        <Col id="reference">{t(`ingredients:units.${data.ingredient.reference || "G"}`)}</Col>
      </Row>

      <Row>
        <Form.Label htmlFor="alc" as={Col} md={2}>
          {t("ingredients:fieldnames.alc")}
        </Form.Label>
        <Col id="alc">{formatNumber(data.ingredient.alc || 0)} g</Col>
      </Row>

      <Row>
        <Form.Label htmlFor="carbs" as={Col} md={2}>
          {t("ingredients:fieldnames.carbs")}
        </Form.Label>
        <Col id="carbs">{formatNumber(data.ingredient.carbs || 0)} g</Col>
      </Row>

      <Row>
        <Form.Label htmlFor="fat" as={Col} md={2}>
          {t("ingredients:fieldnames.fat")}
        </Form.Label>
        <Col id="fat">{formatNumber(data.ingredient.fat || 0)} g</Col>
      </Row>

      <Row>
        <Form.Label htmlFor="proteins" as={Col} md={2}>
          {t("ingredients:fieldnames.proteins")}
        </Form.Label>
        <Col id="proteins">{formatNumber(data.ingredient.proteins || 0)} g</Col>
      </Row>

      <Row>
        <Form.Label htmlFor="proteins" as={Col} md={2}>
          {t("ingredients:fieldnames.calories")}
        </Form.Label>
        <Col id="proteins">{formatIntNumberRounded(calories(data.ingredient))} kcal</Col>
      </Row>

      {!!data.ingredient.units?.length && (
        <>
          <h2>zusätzliche Einheiten / Portionen</h2>

          <ul>
            {data.ingredient.units.map((unit) => (
              <li key={unit.id}>
                1 {t(`ingredients:units.${unit.identifier}`)}: {formatNumber(unit.baseValue)}{" "}
                {t(`ingredients:units.${data.ingredient.reference}`)}
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="recipes-action-list">
        {may(user, "ingredients", "edit", data.ingredient) && (
          <EditButton variant="secondary" href={editIngredientPath(data.ingredient)}>
            bearbeiten
          </EditButton>
        )}

        <CancelButton as={Link} to={ingredientsPath()}>
          zurück
        </CancelButton>
      </div>
    </>
  );
}
