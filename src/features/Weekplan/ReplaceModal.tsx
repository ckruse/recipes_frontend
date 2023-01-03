import { useMutation } from "@apollo/client";

import { Form, Formik, FormikHelpers } from "formik";
import { Form as BsForm, Modal } from "react-bootstrap";

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

  function hideModal() {
    dispatch(setReplaceModal(null));
  }

  async function replaceRecipe(values: TValues, { setSubmitting }: FormikHelpers<TValues>) {
    try {
      setSubmitting(true);
      await replaceWeekplanMutation({
        variables: { id: showReplaceModal!.id, tags: values.tags.map((tag) => tag.name) },
      });

      dispatch(addSuccessFlash("Rezept erfolgreich ausgetauscht"));
      hideModal();
    } catch (error) {
      setSubmitting(false);
      console.error(error);
      dispatch(addErrorFlash("Rezept konnte nicht ausgetauscht werden"));
    }
  }

  return (
    <Modal show={!!showReplaceModal} onHide={hideModal}>
      <Formik initialValues={INITIAL_VALUES} onSubmit={replaceRecipe}>
        {() => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>Rezept austauschen</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <FormGroup>
                <BsForm.Label htmlFor="tags">Rezept-Tags</BsForm.Label>
                <TagSelector isMulti id="tags" name="tags" />
              </FormGroup>
            </Modal.Body>

            <Modal.Footer>
              <SaveButton type="submit">Speichern</SaveButton>
              <CancelButton type="button" onClick={hideModal}>
                Abbrechen
              </CancelButton>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
