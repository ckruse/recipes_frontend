import { useMutation } from "@apollo/client";

import { Form, Formik, FormikHelpers } from "formik";
import { Form as BsForm, Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { CancelButton, FormGroup, SaveButton } from "../../components";
import { TagSelector } from "../../components/Form";
import { REPLACE_WEEKPLAN_RECIPE } from "../../graphql/weekplan";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { IReplaceWeekplanRecipeMutation, TTag } from "../../types";
import { addErrorFlash, addSuccessFlash } from "../Flash/flashSlice";
import { selectWeekplan, setReplaceModal } from "./weekplanSlice";

type TValues = {
  tags: TTag[];
};

const INITIAL_VALUES: TValues = { tags: [] };

export default function ReplaceModal() {
  const dispatch = useAppDispatch();
  const { showReplaceModal } = useAppSelector(selectWeekplan);
  const [replaceWeekplanMutation] = useMutation<IReplaceWeekplanRecipeMutation>(REPLACE_WEEKPLAN_RECIPE);
  const { t } = useTranslation(["translation", "weekplan"]);

  function hideModal() {
    dispatch(setReplaceModal(null));
  }

  async function replaceRecipe(values: TValues, { setSubmitting }: FormikHelpers<TValues>) {
    try {
      setSubmitting(true);
      await replaceWeekplanMutation({
        variables: { id: showReplaceModal!.id, tags: values.tags.map((tag) => tag.name) },
      });

      dispatch(addSuccessFlash(t("weekplan:replace.replaced")));
      hideModal();
    } catch (error) {
      setSubmitting(false);
      console.error(error);
      dispatch(addErrorFlash(t("translation:errors.general")));
    }
  }

  return (
    <Modal show={!!showReplaceModal} onHide={hideModal}>
      <Formik initialValues={INITIAL_VALUES} onSubmit={replaceRecipe}>
        {() => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>{t("weekplan:replace.title")}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <FormGroup>
                <BsForm.Label htmlFor="tags">{t("weekplan:replace.tags")}</BsForm.Label>
                <TagSelector isMulti id="tags" name="tags" />
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>
              <SaveButton type="submit">{t("weekplan:replace.replace")}</SaveButton>
              <CancelButton type="button" onClick={hideModal}>
                {t("translation:cancel")}
              </CancelButton>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
