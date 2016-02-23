Commits = new Mongo.Collection('commits');

Commits.attachSchema(new SimpleSchema({
  boardId: {
    type: String,
  },
  cardId: {
    type: String,
  },
  text: {
    type: String,
  },
  userId: {
    type: String,
  },
}));

Commits.allow({
  insert(userId, doc) {
    return allowIsBoardMember(userId, Boards.findOne(doc.boardId));
  },
  update(userId, doc) {
    return userId === doc.userId;
  },
  remove(userId, doc) {
    return userId === doc.userId;
  },
  fetch: ['userId', 'boardId'],
});

Commits.helpers({
  user() {
    return Users.findOne(this.userId);
  },
});

Commits.hookOptions.after.update = { fetchPrevious: false };

Commits.before.insert((userId, doc) => {
  doc.userId = userId;
});
