import { Button, Col, FormGroup, Row } from "react-bootstrap";
import { Form, InputGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Icon from "react-icons-kit";
import { ic_clear } from "react-icons-kit/md";

type TProps = {
  noRecipes: number;
  setNoRecipes: (noRecipes: number) => void;
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
};

export default function Searchbar({ noRecipes, setNoRecipes, searchTerm, setSearchTerm }: TProps) {
  const { t } = useTranslation(["translation"]);

  const changeNoRecipes = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoRecipes(parseInt(event.target.value));
  };

  function changeTerm(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function clearSearchTerm() {
    setSearchTerm("");
  }

  return (
    <Row className="recipes-weekplan-searchbar">
      <FormGroup as={Col} md={4}>
        <Form.Label htmlFor="recipes-search">Anzahl Rezepte</Form.Label>

        <Form.Control type="number" id="recipes-cnt" value={noRecipes} onChange={changeNoRecipes} />
      </FormGroup>

      <FormGroup as={Col} md={8}>
        <Form.Label htmlFor="recipes-search">Tags</Form.Label>

        <InputGroup>
          <Form.Control type="search" id="recipes-search" value={searchTerm} onChange={changeTerm} />
          <Button variant="outline-secondary" onClick={clearSearchTerm}>
            <Icon icon={ic_clear} title={t("translation:delete")} />
          </Button>
        </InputGroup>
      </FormGroup>
    </Row>
  );
}
