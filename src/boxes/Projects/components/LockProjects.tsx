import React from "react";
import { Button, Container } from "react-bootstrap";
import styles from "../NewProject.module.scss";
import { useHistory } from "react-router";

const LockProjects = () => {
  const history = useHistory();
  const handleRedirect = () => {
    history.push("/skills");
  };
  return (
    <Container
      className={` my-auto px-auto ${styles.constructionContainer}`}
      fluid
    >
      <Container className={styles.construction} fluid>
        <h1>Projects</h1>
        <h6>
          We are proud to share with you a small sample of our projects. But
          first, you have to finish your Sкill matrix form.
        </h6>
        <Button onClick={handleRedirect} className={styles.btn}>
          Back to Skill Matrix
        </Button>
      </Container>
    </Container>
  );
};

export default LockProjects;
