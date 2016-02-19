Patches = new Mongo.Collection('patches');

Patches.attachSchema(new SimpleSchema({
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

Patches.allow({
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

Patches.helpers({
  user() {
    return Users.findOne(this.userId);
  },
});

Patches.hookOptions.after.update = { fetchPrevious: false };

Patches.before.insert((userId, doc) => {
  doc.userId = userId;
});
