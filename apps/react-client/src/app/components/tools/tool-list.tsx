import React from 'react';
import { Tool } from './tool.model';
import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components'

const MinorDiv = styled.div`
  font-size: 0.7em;
`

const ToolList = (props: {
  tools: Tool[],
  selectedTool: Tool,
  selectTool: (id: number) => void
}) => {

  const selectTool = (id: number) => {
    props.selectTool(id);
  };

  const doIt = () => {
    console.log('fdv');
  };

  return (
    <ListGroup>
      {
        props.tools.map(tool => (
          <ListGroup.Item
            key={tool.id}
            action
            active={tool.id === props.selectedTool.id}
            onClick={() => selectTool(tool.id)}>
            <div>{tool.name}</div>
            <MinorDiv>{tool.shortDescription}</MinorDiv>
          </ListGroup.Item>
        ))
      }
    </ListGroup>
  );
};

export default ToolList;
