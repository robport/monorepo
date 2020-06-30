import React from 'react';
import { Tool } from './tool.model';
import ListGroup from 'react-bootstrap/ListGroup';
import styled from 'styled-components'

const MinorDiv = styled.div`
  font-size: 0.7em;
`

const ToolList = (props: {
  tools: Tool[],
  selectedToolId: number,
  selectTool: (id: number) => void
}) => {

  const selectTool = (id: number) => {
    props.selectTool(id);
  };

  return (
    <ListGroup>
      {
        props.tools.map(tool => (
          <ListGroup.Item
            key={tool.id}
            action
            active={tool.id === props.selectedToolId}
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
