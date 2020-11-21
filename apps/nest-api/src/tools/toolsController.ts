import { Controller, Get } from '@nestjs/common';
import { Tool } from '../../../react-client/src/app/components/tools/tool.model';
import { ApiTags } from '@nestjs/swagger';

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
  },
  {
    id: 4,
    name: 'GitHub Actions',
    shortDescription: 'CI/CD Pipeline',
    imageUrl: 'https://avatars0.githubusercontent.com/u/44036562?s=200&amp;v=4',
    description: 'Software workflow automation directly in GitHub',
    categories: ['Devops', 'Continuous Integration', 'Continuous Deployment', 'Productivity Tools'],
    website: 'https://github.com/features/actions/',
    benefits: [
      'Automates testing and deployments workflows',
      'Build definition stored as code in GitHub',
      'Eliminates the need for separate build service like CircleCI',
      'Great documentation and extensive flexibility'
    ]
  },
  {
    id: 5,
    name: 'Amazon ESC Fargate',
    shortDescription: 'Container Execution Service',
    imageUrl: '',
    description: 'Compute engine to run containers without having to manage individual servers',
    categories: ['Devops', 'Continuous Integration', 'Continuous Deployment', 'Productivity Tools'],
    website: 'https://aws.amazon.com/fargate/getting-started/',
    benefits: [
      'Resilient, scalable, low maintenance compute container'
    ]
  }
];

@ApiTags('Architecture')
@Controller('tools')
export class ToolsController {
  @Get()
  findAll() {
    return tools;
  }
}
