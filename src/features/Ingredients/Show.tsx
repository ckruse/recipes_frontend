import { useQuery } from "@apollo/client";

import { Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { INGREDIENT_QUERY } from "../../graphql/ingredients";
import { useTitle } from "../../hooks";
import { IIngredientQueryResult } from "../../types";
import { formatNumber } from "../../utils/numbers";

export default function Show() {
  const { id } = useParams<"id">();
  const { t } = useTranslation(["ingredients", "translation"]);
  const { data } = useQuery<IIngredientQueryResult>(INGREDIENT_QUERY, { variables: { id } });

  useTitle(t("ingredients:show.title", { name: data?.ingredient.name || "…" }));

  return (
    <>
      <h1>{t("ingredients:show.title", { name: data?.ingredient.name || "…" })}</h1>

      <Row>
        <Form.Label as={Col} md={2}>
          {t("ingredients:fieldnames.reference")}
        </Form.Label>
        <Col>{t(`ingredients:units.${data?.ingredient.reference || "G"}`)}</Col>
      </Row>

      <Row>
        <Form.Label as={Col} md={2}>
          {t("ingredients:fieldnames.alc")}
        </Form.Label>
        <Col>{formatNumber(data?.ingredient.alc || 0)} g</Col>
      </Row>

      <Row>
        <Form.Label as={Col} md={2}>
          {t("ingredients:fieldnames.carbs")}
        </Form.Label>
        <Col>{formatNumber(data?.ingredient.carbs || 0)} g</Col>
      </Row>

      <Row>
        <Form.Label as={Col} md={2}>
          {t("ingredients:fieldnames.fat")}
        </Form.Label>
        <Col>{formatNumber(data?.ingredient.fat || 0)} g</Col>
      </Row>

      <Row>
        <Form.Label as={Col} md={2}>
          {t("ingredients:fieldnames.proteins")}
        </Form.Label>
        <Col>{formatNumber(data?.ingredient.proteins || 0)} g</Col>
      </Row>
    </>
  );
}
