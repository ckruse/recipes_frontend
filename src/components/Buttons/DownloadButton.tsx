import _ from "lodash";
import Icon from "react-icons-kit";
import { ic_cloud_download } from "react-icons-kit/md";

import { Button, ButtonProps } from ".";

export const DownloadButton = (props: ButtonProps) => (
  <Button variant="secondary" {..._.omit(props, ["children"])}>
    <Icon icon={ic_cloud_download} /> {props.children}
  </Button>
);
