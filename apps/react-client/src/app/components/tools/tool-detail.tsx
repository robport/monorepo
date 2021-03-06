import React, { useEffect } from 'react';
import { Tool } from './tool.model';
import styled from 'styled-components';
import gsap from "gsap";

const Label = styled.div`
  font-size: 0.8em;
  color: grey;
`;

const Value = styled.div`
  font-size: 1em;
  padding-bottom: 10px
`;

const ToolDetail = (props: { tool: Tool }) => {

  const tool = props.tool;

  useEffect(() => {
    gsap.from('#todo-detail', {
      duration: 0.5,
      opacity: 0,
    });
  } )

  return (
    <div id='todo-detail'>
      {tool.imageUrl &&
      <img width="100" height="100" src={tool.imageUrl} alt="logo image"/>
      }
      <Label>Name</Label>
      <Value>{tool.name}</Value>

      <Label>Categories</Label>
      <ul>
        {
          tool.categories.map((category, i) => (
            <li key={i}>{category}</li>
          ))
        }
      </ul>
      <Label>Website</Label>
      <Value><a href={tool.website}>{tool.website}</a></Value>
      <Label>Description</Label>
      <Value>{tool.description}</Value>
      <Label>Benefits</Label>
      <ul>
        {
          tool.benefits.map((category, i) => (
            <li key={i}>{category}</li>
          ))
        }
      </ul>
    </div>
  );

};

export default ToolDetail;
