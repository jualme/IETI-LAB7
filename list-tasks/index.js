module.exports = async function (context, req) {
    context.log('Adding a task to the planner');
    const task = req.body;
    const {MongoClient} = require("mongodb");
    const uri =
        "mongodb+srv://jualme:Juan241293@cluster0.zcj0p.azure.mongodb.net/Cluster0?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db("Cluster0");
        const collection = database.collection("tasks");
        const result = await collection.find();

        console.log(`${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,);

    } finally {
        await client.close();
        const responseMessage = {response: task};
        context.res = {
            status: 200,
            body: responseMessage
        };
    }

}

