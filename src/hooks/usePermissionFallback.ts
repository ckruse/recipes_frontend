import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from ".";
import { addErrorFlash } from "../features/Flash/flashSlice";
import { rootPath } from "../urls";

export function usePermissionFallback(allowed: boolean) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["translation"]);

  useEffect(() => {
    if (!allowed) {
      navigate(rootPath());
      dispatch(addErrorFlash(t("translation:errors.permission")));
    }
  });
}
