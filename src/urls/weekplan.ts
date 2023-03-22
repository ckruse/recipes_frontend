import { dateFormat } from "../dateUtils";
import { TUser } from "../types";

export const weekplanPath = () => "/weekplan";

export const weekplanBringImportUri = (user: TUser, week: Date, days: number[] = []) => {
  const daysStr = days.map((day) => `&days[]=${day}`).join("");
  const weekStr = dateFormat(week, "yyyy-MM-dd");
  const uri = `https://recipes.wwwtech.de/weekplan/${user.id}/bring.json?week=${weekStr}${daysStr}`;

  return `https://api.getbring.com/rest/bringrecipes/deeplink?url=${encodeURIComponent(uri)}&source=web`;
};
