import _ from "lodash";
import { MdCloudDownload } from "react-icons/md";

import { Button, type ButtonProps } from ".";

export const DownloadButton = (props: ButtonProps) => (
  <Button variant="secondary" {..._.omit(props, ["children"])}>
    <MdCloudDownload /> {props.children}
  </Button>
);
