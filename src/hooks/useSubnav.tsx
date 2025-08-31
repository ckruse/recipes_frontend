import React, { useCallback, useEffect } from "react";

import { addSubnav, removeSubnav } from "@/App/sessionSlice";

import { useAppDispatch } from ".";

export function useSubnav<T extends object>(Nav: React.ComponentType<T>, properties: T = {} as T) {
  const dispatch = useAppDispatch();

  const stableDispatch = useCallback(dispatch, [dispatch]);
  const propertiesJson = JSON.stringify(properties);

  useEffect(
    () => {
      stableDispatch(addSubnav(<Nav {...properties} />));

      return () => {
        stableDispatch(removeSubnav());
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Nav, propertiesJson, stableDispatch],
  );
}
