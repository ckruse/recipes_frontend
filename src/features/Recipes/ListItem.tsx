import _ from "lodash";
import { ButtonGroup } from "react-bootstrap";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { selectSession } from "../../App/sessionSlice";
import { DeleteButton, ShowButton } from "../../components";
import { indexDate } from "../../dateUtils";
import { useAppSelector } from "../../hooks";
import may from "../../permissions";
import { TRecipe } from "../../types";
import { showRecipePath } from "../../urls";
import { URI } from "../../utils";
import { formatIntNumberRounded } from "../../utils/numbers";

type TProps = {
  recipe: TRecipe;
  deleteItem?: (recipe: TRecipe) => void;
  buttons?: React.ReactNode;
};

export default function ListItem({ recipe, deleteItem, buttons }: TProps) {
  const { t } = useTranslation(["recipes", "translation"]);
  const { user } = useAppSelector(selectSession);

  return (
    <li className="recipes-list-item">
      <div className="recipe-preview">{!!recipe.image && <img src={`${URI}${recipe.image.thumb}`} alt="" />}</div>

      <h3>
        <Link to={showRecipePath(recipe)}>{recipe.name}</Link>
      </h3>

      <Trans parent="span" className="calories" t={t} i18nKey="recipes:list.calories">
        {{ calories: formatIntNumberRounded(recipe.calories?.calories || 0) }} kcal pro Portion
      </Trans>
      <span className="created">{indexDate(recipe.insertedAt)}</span>

      <ul className="recipes-recipes-show-tags-list">
        {_(recipe.tags)
          .sortBy("name")
          .map((tag) => (
            <li className="tag" key={tag.id}>
              {tag.name}
            </li>
          ))
          .valueOf()}
      </ul>

      <ButtonGroup size="sm">
        <ShowButton as={Link} to={showRecipePath(recipe)}>
          {t("translation:show")}
        </ShowButton>
        {buttons}
        {!!deleteItem && may(user, "recipes", "create") && (
          <DeleteButton onClick={() => deleteItem(recipe)}>{t("translation:delete")}</DeleteButton>
        )}
      </ButtonGroup>
    </li>
  );
}
