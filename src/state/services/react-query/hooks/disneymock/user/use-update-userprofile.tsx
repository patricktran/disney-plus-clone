import AppContext from "utils/app-context";

import useBaseMutation from "../../../base/use-base-mutation";

import { UpdateUserProfileRequestParams } from "./types";

export const useUpdateUserProfile = () => {
  const { mutate, mutateAsync, ...rest } = useBaseMutation<
    any,
    Error,
    UpdateUserProfileRequestParams
  >((params) => {
    return {
      body: {},
      method: "PUT",
      url: `${AppContext.Config.api.disneyBaseUrl}/userprofile/${params.userId}`,
    };
  });

  return {
    mutateUserProfile: mutate,
    mutateUserProfileAsync: mutateAsync,
    ...rest,
  };
};
