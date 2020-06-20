import React, { useState } from 'react';
import { Title, Wrapper } from '../../common/atom';
import { Tool } from './tool.model';
import ToolDetail from './tool-detail';
import ToolList from './tool-list';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

const tools: Tool[] = [
  {
    id: 1,
    name: 'Nx',
    shortDescription: 'Monorepo',
    imageUrl: 'https://nx.dev/assets/images/nx-logo.svg',
    description: 'Develop several applications or libraries in one source code repository',
    categories: ['Project Structure', 'Monorepo'],
    website: 'https://nx.dev',
    benefits: [
      'Share code between applications (e.g. common type library)',
      'Simplify refactoring ',
      'Full-stack changes in single commit or PR']
  },
  {
    id: 2,
    name: 'React',
    shortDescription: 'Front End',
    description: 'Front end framework for building single page applications',
    categories: ['Front-end Framework', 'Single-Page Application'],
    website: 'https://reactjs.org',
    benefits: []
  }

];

const Tools = () => {
  const [selectedTool, setSelectedTool] = useState<Tool>(tools[0]);

  const selectTool = (id: number): void => {
    setSelectedTool(tools.find(tool => tool.id === id));
  };

  return (
    <Wrapper>
      <Title>What this site uses:</Title>
      <Container>
        <Row>
          <Col sm={2}>
            <ToolList tools={tools}
                      selectedTool={selectedTool}
                      selectTool={selectTool}/>
          </Col>
          <Col>
            <ToolDetail tool={selectedTool}/>
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Tools;
