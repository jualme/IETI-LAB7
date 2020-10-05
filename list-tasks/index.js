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
        collection.find({}).toArray(function(error, documents){
            if (error) throw error;
            console.log(documents)
            const responseMessage = {response: documents};
            context.res = {
                status: 200,
                body: responseMessage
            };
        });
    } finally {
        await client.close();

    }

}

