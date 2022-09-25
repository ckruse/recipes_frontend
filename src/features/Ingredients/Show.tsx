import { useQuery } from "@apollo/client";

import { Col, Form, Row } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { INGREDIENT_QUERY } from "../../graphql/ingredients";
import { useTitle } from "../../hooks";
import { IIngredientQueryResult } from "../../types";

export default function Show() {
  const { id } = useParams<"id">();
  const { t } = useTranslation(["ingredients", "translation"]);
  const { data } = useQuery<IIngredientQueryResult>(INGREDIENT_QUERY, {
    variables: { id: parseInt(id || "0", 10) },
  });

  useTitle(t("ingredients:show.title", { name: data?.ingredient.name || "…" }));

  return (
    <>
      <h1>{t("ingredients:show.title", { name: data?.ingredient.name || "…" })}</h1>

      <Row>
        <Form.Label as={Col} md={2}>
          {t("ingredients:fieldnames.reference")}
        </Form.Label>
        <Col>{data?.ingredient.reference}</Col>
      </Row>

      <Row>
        <Form.Label as={Col} md={2}>
          {t("ingredients:fieldnames.alc")}
        </Form.Label>
        <Col>{data?.ingredient.alc}</Col>
      </Row>

      <Row>
        <Form.Label as={Col} md={2}>
          {t("ingredients:fieldnames.carbs")}
        </Form.Label>
        <Col>{data?.ingredient.carbs}</Col>
      </Row>

      <Row>
        <Form.Label as={Col} md={2}>
          {t("ingredients:fieldnames.fat")}
        </Form.Label>
        <Col>{data?.ingredient.fat}</Col>
      </Row>

      <Row>
        <Form.Label as={Col} md={2}>
          {t("ingredients:fieldnames.proteins")}
        </Form.Label>
        <Col>{data?.ingredient.proteins}</Col>
      </Row>
    </>
  );
}
