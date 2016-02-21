Issues = new Mongo.Collection('issues');

Issues.attachSchema(new SimpleSchema({
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

Issues.allow({
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

Issues.helpers({
  user() {
    return Users.findOne(this.userId);
  },
});

Issues.hookOptions.after.update = { fetchPrevious: false };

Issues.before.insert((userId, doc) => {
  doc.userId = userId;
});
