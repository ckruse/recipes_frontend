import { useMutation } from "@apollo/client";
import { format, getDay, startOfISOWeek } from "date-fns";
import { Form, Formik } from "formik";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { CancelButton, SaveButton } from "@/components";
import { addErrorFlash, addSuccessFlash } from "@/features/Flash/flashSlice";
import { CREATE_WEEKPLAN } from "@/graphql/weekplan";
import { useAppDispatch, useAppSelector } from "@/hooks";

import { selectWeekplan, setWeekplanCreateModal } from "../weekplanSlice";
import InnerForm from "./InnerForm";

export type TValues = {
  week: Date;
  portions: number;
  tags: TTag[];
  days: number[];
};

const INITIAL_VALUES: TValues = {
  week: startOfISOWeek(new Date()),
  portions: 2,
  tags: [{ id: "20", name: "hauptspeise" } as TTag],
  days: [0, 5, 6].includes(getDay(new Date())) ? [5, 6] : [1, 2, 3],
};

export default function CreateWeekplanModal() {
  const { week } = useAppSelector(selectWeekplan);
  const { showWeekplanCreateModal } = useAppSelector(selectWeekplan);
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["translation", "weekplan"]);

  const [createWeekplanMutation] = useMutation<ICreateWeekplanMutation>(CREATE_WEEKPLAN, {
    refetchQueries: ["weekplans"],
  });

  function hideModal() {
    dispatch(setWeekplanCreateModal(false));
  }

  async function handleSubmit(values: TValues) {
    try {
      await createWeekplanMutation({
        variables: {
          week: format(values.week, "yyyy-MM-dd"),
          portions: values.portions,
          tags: values.tags.map((tag) => tag.name),
          days: values.days,
        },
      });

      dispatch(addSuccessFlash(t("weekplan:create.success")));
      hideModal();
    } catch (error) {
      console.error(error);
      dispatch(addErrorFlash(t("translation:errors.general")));
    }
  }

  return (
    <Modal show={showWeekplanCreateModal} onHide={hideModal}>
      <Formik initialValues={{ ...INITIAL_VALUES, week }} onSubmit={handleSubmit}>
        {() => (
          <Form>
            <Modal.Header closeButton>
              <Modal.Title>{t("weekplan:create.title")}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <InnerForm />
            </Modal.Body>

            <Modal.Footer>
              <SaveButton type="submit" variant="primary">
                {t("weekplan:create.save")}
              </SaveButton>

              <CancelButton type="button" variant="secondary" onClick={hideModal}>
                {t("translation:cancel")}
              </CancelButton>
            </Modal.Footer>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
