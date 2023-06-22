const mongoose = require('mongoose');

class Player {
  constructor(name,score) {
    this.name = name;
    this.score = score;
  }
}

class TeamStore {
  constructor() {
    this.team = [];
  }

  async connectToDatabase() {
    try {
      await mongoose.connect('mongodb+srv://divyaj:jnana2004@cluster0.ohjvr9b.mongodb.net/team', {
      });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
    }
  }

  async storePlayers(players) {
    try {
      const playerSchema = new mongoose.Schema({
        name: String,
        score: String,
      });

      const PlayerModel = mongoose.model('Player', playerSchema);
      await PlayerModel.insertMany(players);
      console.log('Players stored successfully!');

      const readPlayers = await PlayerModel.find();
      console.log('Read players:', readPlayers);

      const playerToUpdate = await PlayerModel.findOne({ name: 'player1' });
      if (playerToUpdate) {
        playerToUpdate.score = '66';
        await playerToUpdate.save();
        console.log('Player updated successfully!');
      }

      const playerToDelete = await PlayerModel.findOne({ name: 'player2' });
      if (playerToDelete) {
        await playerToDelete.remove();
        console.log('Player deleted successfully!');
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      mongoose.disconnect();
    }
  }
}

// Usage
const players = [
  new Player('player1', '2'),
  new Player('player2', '3'),
  new Player('player3', '3')
];

const teamStore = new TeamStore();
teamStore.connectToDatabase()
  .then(() => teamStore.storePlayers(players))
  .catch((err) => console.error('Error:', err));
