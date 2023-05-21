import React from 'react';
import {
  Button,
  Card,
  Col,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';

import PROJECTS from '../../data/projects.json';

export interface IProject {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  roles: string[];
  image: any;
}
const ProjectCard = () => {
  let randomNumber = Math.floor(Math.random() * 3);
  return (
    <Row className="g-3 my-auto h-75">
      <Col
        md={{ order: 1, span: 3 }}
        xs={{ order: 2, span: 6 }}
        className="col-2 my-auto text-center py-2">
        <div className="d-flex flex-column align-items-center">
          <Button
            onClick={() => console.log('Missmatch project')}
            variant="outline-white"
            className="text-primary">
            Missmatch Skills
          </Button>
        </div>
      </Col>
      <Col
        md={{ order: 2, span: 6 }}
        xs={{ order: 1, span: 12 }}
        className="h-100">
        {PROJECTS.projects
          .filter((project: any) => project.id === randomNumber)
          .map(
            ({
              id,
              title,
              description,
              technologies,
              roles,
              image,
            }: IProject) => (
              <Card className="h-100 overflow-auto" key={id} id="card">
                <Card.Title as="h1" className="text-center">
                  {title}
                </Card.Title>
                <Card.Img
                  src={image.url}
                  alt={image.name}
                  className="w-75 mx-auto"
                />
                <Card.Body>
                  <Card.Title as="h6">Project Description</Card.Title>
                  <Card.Text>{description}</Card.Text>
                </Card.Body>
                <Card.Body>
                  <Card.Title as="h6">Project Technologies</Card.Title>
                  <ListGroup className="list-group-flush">
                    {technologies.map((tech) => (
                      <ListGroupItem>{tech}</ListGroupItem>
                    ))}
                  </ListGroup>
                </Card.Body>
                <Card.Body>
                  <Card.Title as="h6">Roles</Card.Title>
                  <ListGroup className="list-group-flush">
                    {roles.map((role) => (
                      <ListGroupItem>{role}</ListGroupItem>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            ),
          )}
      </Col>
      <Col
        md={{ order: 3, span: 3 }}
        xs={{ order: 3, span: 6 }}
        className="col-2 my-auto text-center py-2">
        <div className="d-flex flex-column align-items-center">
          <Button
            onClick={() => console.log('Match project')}
            variant="outline-white"
            className="text-primary">
            Match Skills
          </Button>
        </div>
      </Col>
      <Col
        md={{ order: 4, span: 12 }}
        xs={{ order: 4, span: 12 }}
        className="col-2 my-auto py-2 float-end">
        <div
          className="float-end text-center my-auto"
          onClick={() => console.log('Next project')}>
          <Button variant="outline-white" className="text-primary text-center">
            Next Project
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default ProjectCard;
