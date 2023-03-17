module.exports = {
  name: 'ready',
	once: true,
  async execute(client) {
  const Activities = [
    "/help | gaming lounge",
    "Your Tournament Matches"
  ];

  setInterval(() => {
    client.user.setPresence({ 
      activities: [
        { 
          type: 3, // WATCHING
          name: Activities[Math.floor(Math.random() * Activities.length)],
        }
      ], status: 'online' });
  }, 10000);
  }
};
