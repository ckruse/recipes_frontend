import { useEffect, useState } from "react";

import { Button, Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Icon from "react-icons-kit";
import { ic_clear } from "react-icons-kit/md";

import { FormGroup } from "@/components";

type TProps = {
  setSearch: (search: string) => void;
  searchTerm: string;
};

export default function Searchbar({ setSearch, searchTerm }: TProps) {
  const { t } = useTranslation(["root"]);
  const [value, setValue] = useState(searchTerm);

  function changeTerm(ev: React.ChangeEvent<HTMLInputElement>) {
    setValue(ev.target.value);
    setSearch(ev.target.value);
  }

  function clearTerm() {
    setValue("");
    setSearch("");
  }

  useEffect(
    () => {
      if (searchTerm !== value) {
        setValue(searchTerm);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchTerm],
  );

  return (
    <FormGroup>
      <Form.Label htmlFor="recipes-search" className="visually-hidden">
        {t("root:search...")}
      </Form.Label>

      <InputGroup>
        <Form.Control type="search" id="recipes-search" value={value} onChange={changeTerm} />
        <Button variant="outline-secondary" onClick={clearTerm}>
          <Icon icon={ic_clear} title={t("translation:delete")} />
        </Button>
      </InputGroup>
    </FormGroup>
  );
}
