import { MongoMemoryServer } from 'mongodb-memory-server';
import { Db, MongoClient } from 'mongodb';

jest.setTimeout(100000000);

describe('todos mongo db service', () => {
  let mongoClient: MongoClient;
  let db: Db;

  const mongoServer = new MongoMemoryServer({
    binary: {
      version: '4.2.10'
    }
  });

  describe('should add a todo', () => {

    beforeEach(async () => {
      await mongoServer.start();
      const uri = await mongoServer.getUri();
      mongoClient = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      db = mongoClient.db(await mongoServer.getDbName());
    });

    afterEach(async () => {
      if (mongoClient) {
        await mongoClient.close();
      }
      if (mongoServer) {
        await mongoServer.stop();
      }
    });

    it('should add a todo', async () => {
      expect(db).toBeDefined();
      const col = db.collection('test');
      const result = await col.insertMany([{ a: 1 }, { b: 1 }]);
      expect(await col.countDocuments({})).toBe(2);
    });

  });
});
