import React, { useEffect, useState } from 'react';
import { Title, Wrapper } from '../../common/atom';
import { Tool } from './tool.model';
import ToolList from './tool-list';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { httpGet } from '../../common/http';
import useErrorContext from '../../common/use-error-context';
import ToolDetail from './tool-detail';

interface PageState {
  tools?: Tool[],
  selected: Tool
}

const Tools = () => {
  const [pageState, setPageState] = useState<PageState>();
  const { addError } = useErrorContext();

  const selectTool = (id: number): void => {

    setPageState({
      tools: pageState.tools,
      selected: pageState.tools.find(tool => tool.id === id)
    });
  };

  const findAllTech = () => {
    httpGet('tools')
      .catch(e => addError(e.message))
      .then(tech => {
        setPageState({
          tools: tech,
          selected: tech[0]
        });
      });
  };

  useEffect(findAllTech, []);

  return (
    <Wrapper>
      <Title>What this site uses:</Title>
      {pageState &&
        <Container>
          <Row>
            <Col sm={2}>
              <ToolList tools={pageState.tools}
                        selectedToolId={pageState.selected.id}
                        selectTool={selectTool}/>
            </Col>
            <Col>
              <ToolDetail tool={pageState.selected}/>
            </Col>
          </Row>
        </Container>
      }
    </Wrapper>
  );
};

export default Tools;
