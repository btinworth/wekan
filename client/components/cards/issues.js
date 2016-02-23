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
    const issue = this.trim();
    card.removeIssue(issue);
    Popup.close();
    evt.preventDefault();
  },
  'click .js-add-issue': Popup.open('createIssue'),
});

Template.createIssuePopup.events({
  'submit .create-issue'(evt, tpl) {
    const card = Cards.findOne(Session.get('currentCard'));
    const issue = tpl.$('#issueName').val().trim();
    if (issue.length > 0 /*&& (/^[0-9]+$$/.test(issue))*/) {
      card.addIssue(issue);
      Popup.close();
    }
    evt.preventDefault();
  },
});
