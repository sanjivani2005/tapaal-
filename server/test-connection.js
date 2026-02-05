const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://sanjivanishende9_db_user:S%2540nj8484@cluster0.s3d8ocl.mongodb.net/HomeTown%20Overview?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Test connection to HomeTown Overview database
    const database = client.db('HomeTown Overview');

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Pinged your deployment. You successfully connected to MongoDB!");

    // Test creating a collection and inserting a document
    const collection = database.collection('test');
    const testDoc = { name: 'Test Document', created: new Date() };
    const result = await collection.insertOne(testDoc);
    console.log("✅ Test document inserted:", result.insertedId);

    // Test reading the document
    const foundDoc = await collection.findOne({ _id: result.insertedId });
    console.log("✅ Test document found:", foundDoc);

    // Clean up
    await collection.deleteOne({ _id: result.insertedId });
    console.log("✅ Test document cleaned up");

    console.log("🎉 MongoDB Atlas connection is working perfectly!");

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);
