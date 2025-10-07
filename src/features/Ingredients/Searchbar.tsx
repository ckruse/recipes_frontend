import { useEffect, useState } from "react";

import { Button, Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { MdClear } from "react-icons/md";

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

  useEffect(() => {
    if (searchTerm !== value) {
      setValue(searchTerm);
    }
  }, [searchTerm]);

  return (
    <FormGroup>
      <Form.Label htmlFor="recipes-search" className="visually-hidden">
        {t("root:search...")}
      </Form.Label>

      <InputGroup>
        <Form.Control type="search" id="recipes-search" value={value} onChange={changeTerm} />
        <Button variant="outline-secondary" onClick={clearTerm}>
          <MdClear title={t("translation:delete")} />
        </Button>
      </InputGroup>
    </FormGroup>
  );
}
