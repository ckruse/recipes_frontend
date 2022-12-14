import { TTag } from "../types";

export const tagsPath = () => "/tags";
export const showTagPath = (tag: TTag) => `/tags/${tag.id}`;
