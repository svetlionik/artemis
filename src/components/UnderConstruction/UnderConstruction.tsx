import React from "react";
import { Button, Container } from "react-bootstrap";
import styles from "./UnderConstruction.module.scss";
import { useHistory } from "react-router";

const UnderConstruction = () => {
  const history = useHistory();
  const handleRedirect = () => {
    history.goBack();
  };
  return (
    <Container
      className={` my-auto px-auto ${styles.constructionContainer}`}
      fluid
    >
      <Container className={styles.construction} fluid>
        <h1>This page is still under construction</h1>
        <Button onClick={handleRedirect} className={styles.btn}>
          Go back
        </Button>
      </Container>
    </Container>
  );
};

export default UnderConstruction;
