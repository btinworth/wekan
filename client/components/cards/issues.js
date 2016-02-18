Meteor.startup(() => {

});

BlazeComponent.extendComponent({
  onCreated() {

  },

  issues() {
    return { name: '' };
  },

  events() {
    return [{
    }];
  },
}).register('formIssue');

Template.createIssuePopup.helpers({

});

Template.cardIssuesPopup.events({
  'click .js-select-issue'(evt) {
    if (Meteor.settings.public.issueLinkPrefix || Meteor.settings.public.issueLinkSufix) {
      var addr = this;
      if (Meteor.settings.public.issueLinkPrefix)
        addr = Meteor.settings.public.issueLinkPrefix + this;
      if (Meteor.settings.public.issueLinkSufix)
        addr += Meteor.settings.public.issueLinkSufix;
      window.open(addr);
    }
    evt.preventDefault();
  },
  'click .js-remove-issue'(evt) {
    const card = Cards.findOne(Session.get('currentCard'));
    card.removeIssue(this.trim());
    Popup.close();
    evt.preventDefault();
  },
  'click .js-add-issue': Popup.open('createIssue'),
});

Template.formIssue.events({

});

Template.createIssuePopup.events({
  'submit .create-issue'(evt, tpl) {
    const card = Cards.findOne(Session.get('currentCard'));
    const name = tpl.$('#issueName').val().trim();
    card.addIssue(name);
    Popup.close();
    evt.preventDefault();
  },
});

Template.cardIssuesPopup.helpers({
  isIssueSelected(cardId) {
    return _.contains(Cards.findOne(cardId).issueIds, this._id);
  },
});
