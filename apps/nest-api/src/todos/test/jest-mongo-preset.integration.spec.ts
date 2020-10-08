import { Db, MongoClient } from 'mongodb';

describe('jest memory server', () => {

  let mongoClient: MongoClient;
  let db: Db;

  describe('should add a todo', () => {
    beforeEach(async () => {
      mongoClient = await MongoClient.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

      db = mongoClient.db('test');
    });

    afterEach(async () => {
      if (mongoClient) {
        await mongoClient.close();
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
