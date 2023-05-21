import React from "react";
import { Container } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import LockProjects from "./components/LockProjects";
import { useSelector } from "react-redux";

const Projects = () => {
  const { unlock } = useSelector((state: any) => state.projects);
  return <Container>{unlock ? <ProjectCard /> : <LockProjects />}</Container>;
};

export default Projects;
