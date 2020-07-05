import { Test, TestingModule } from '@nestjs/testing';
import { TodosArrayService } from './todos.array.service';

describe('TodosService', () => {
  let service: TodosArrayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodosArrayService],
    }).compile();

    service = module.get<TodosArrayService>(TodosArrayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
