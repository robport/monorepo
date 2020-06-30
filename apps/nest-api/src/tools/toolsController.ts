import { Controller, Get } from '@nestjs/common';
import { Tool } from '../../../react-client/src/app/components/tools/tool.model';

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
    imageUrl: '/assets/react-logo.png',
    description: 'Front end framework for building single page applications',
    categories: ['Front-end Framework', 'Single-Page Application'],
    website: 'https://reactjs.org',
    benefits: [
      ''
    ]
  },
  {
    id: 3,
    name: 'NestJS',
    shortDescription: 'Backend Framework',
    imageUrl: 'https://docs.nestjs.com/assets/logo-small.svg',
    description: 'NestJs framework for building server-side applications, heavily inspired by Angular',
    categories: ['Backend Framework'],
    website: 'https://nestjs.com/',
    benefits: [
      'Out of the box application architecture',
      'Use Decorators to separate business logic from common concerns',
      'Supports for Web Application, Microservices and Libraries.',
      'Use as much or as little of the framework as you like'
    ]
  }


];


@Controller('tools')
export class ToolsController {
  @Get()
  findAll() {
    return tools;
  }
}
