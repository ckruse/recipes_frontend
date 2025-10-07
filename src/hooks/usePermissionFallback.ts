import { useEffect } from "react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { addErrorFlash } from "@/features/Flash/flashSlice";
import { rootPath } from "@/urls";

import { useAppDispatch } from ".";

export function usePermissionFallback(allowed: boolean) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation(["translation"]);

  useEffect(() => {
    if (!allowed) {
      navigate(rootPath());
      dispatch(addErrorFlash(t("translation:errors.permission")));
    }
  }, [allowed]);
}
