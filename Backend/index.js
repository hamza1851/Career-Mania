const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);

const port = process.env.PORT || 5000;
// const mongoURI =
//   "mongodb+srv://hamzadev011:Meralockk08@cluster0.4lpoxah.mongodb.net/";

app.use(express.json());
app.use(cors());

// user = hamzadev011
// pass = SLwZwIcwxcRqLAP5

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@career-mania.1gtwosy.mongodb.net/?retryWrites=true&w=majority&appName=Career-Mania`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    //create DB
    const db = client.db("careerMania");
    const jobsCollection = db.collection("demoJobs");

    //post jobs
    app.post("/post-job", async (req, res) => {
      const body = req.body;
      body.createAt = new Date();
      const result = await jobsCollection.insertOne(body);
      if (result.insertedId) {
        return res.status(200).send(result);
      } else {
        return res.status(404).send({
          message: "can not insert! try again later",
          status: false,
        });
      }
    });

    //get all jobs
    app.get("/all-jobs", async (req, res) => {
      const jobs = await jobsCollection.find({}).toArray();
      res.send(jobs);
    });

    //get single job using id
    app.get("/all-jobs/:id", async (req, res) => {
      const id = req.params.id;
      const job = await jobsCollection.findOne({ _id: new ObjectId(id) });
      res.send(job);
    });

    //get jobs by email
    app.get("/myJobs/:email", async (req, res) => {
      // console.log(req.params.email);
      const jobs = await jobsCollection
        .find({ postedBy: req.params.email })
        .toArray();
      res.send(jobs);
    });

    // delete a job
    app.delete("/job/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await jobsCollection.deleteOne(filter);
      res.send(result);
    });

    //update job
    app.patch("/update-job/:id", async (req, res) => {
      const id = req.params.id;
      const jobData = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = { $set: { ...jobData } };

      const result = await jobsCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", async (req, res) => {
  try {
    const client = await connectToMongoDB();
    // Perform MongoDB operations here
    res.send("Hello World");
    await client.close();
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
