import { PermissionBagType } from ".";

const WeekplanPermissions: PermissionBagType<any>["weekplan"] = {
  default: (user, _resource) => !!user,
};

export default WeekplanPermissions;
