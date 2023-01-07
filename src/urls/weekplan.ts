import { dateFormat } from "../dateUtils";
import { TUser } from "../types";

export const weekplanPath = () => "/weekplan";

export const weekplanBringImportUri = (user: TUser, week: Date) => {
  const uri = `https://recipes.wwwtech.de/weekplan/${user.id}/bring.json?week=${dateFormat(week, "yyyy-mm-dd")}`;
  return `https://api.getbring.com/rest/bringrecipes/deeplink?url=${encodeURIComponent(uri)}&source=web`;
};
