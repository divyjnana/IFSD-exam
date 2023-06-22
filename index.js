const { MongoClient, ObjectId } = require('mongodb');

class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

class Database {
  constructor(uri) {
    this.uri = uri;
    this.client = new MongoClient(this.uri);
  }

  async connect() {
    await this.client.connect();
    console.log('Connected to the MongoDB server');
  }

  async storePlayers(players) {
    try {
      const database = this.client.db('team');
      const collection = database.collection('players');

      // Insert each player document into the collection
      await collection.insertMany(players);
      console.log('Players stored successfully');

      // Read players
      const readPlayers = await collection.find().toArray();
      console.log('Read players:', readPlayers);

      // Update a player
      const playerToUpdate = { name: 'player1' }; // Replace with the actual name of the player to update
      const updatedPlayer = { $set: { score: '200' } }; // Specify the fields to update
      await collection.updateOne(playerToUpdate, updatedPlayer);
      console.log('Player updated successfully!');
      
      // Delete a player
      const playerToDelete = {name:'player3'}; // Replace with the actual ObjectId of the player to delete
      await collection.deleteOne(playerToDelete);
      console.log('Player deleted successfully!');
    } catch (err) {
      console.error('Error:', err);
    }
  }

  async close() {
    await this.client.close();
    console.log('MongoDB connection closed');
  }
}

// Usage
const players = [
  new Player('player1', '2'),
  new Player('player2', '3'),
  new Player('player3', '3')
];

async function main() {
  const uri = 'mongodb+srv://divyaj:jnana2004@cluster0.ohjvr9b.mongodb.net/mydatabase?retryWrites=true&w=majority';

  const db = new Database(uri);
  await db.connect();
  await db.storePlayers(players);
  await db.close();
}

main();
