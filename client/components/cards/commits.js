Template.cardCommitsPopup.events({
  'click .js-select-commit'(evt) {
    if (Meteor.settings.public.commitLinkPrefix || Meteor.settings.public.commitLinkSufix) {
      var addr = this;
      if (Meteor.settings.public.commitLinkPrefix)
        addr = Meteor.settings.public.commitLinkPrefix + this;
      if (Meteor.settings.public.commitLinkSufix)
        addr += Meteor.settings.public.commitLinkSufix;
      window.open(addr);
    }
    evt.preventDefault();
  },
  'click .js-remove-commit'(evt) {
    const card = Cards.findOne(Session.get('currentCard'));
    card.removeCommit(this.trim());
    Popup.close();
    evt.preventDefault();
  },
  'click .js-add-commit': Popup.open('createCommit'),
});

Template.createCommitPopup.events({
  'submit .create-commit'(evt, tpl) {
    const card = Cards.findOne(Session.get('currentCard'));
    const name = tpl.$('#commitName').val().trim();
    if (name.length > 0) {
      card.addCommit(name);
      Popup.close();
    }
    evt.preventDefault();
  },
});
