Template.cardPatchesPopup.events({
  'click .js-select-patch'(evt) {
    if (Meteor.settings.public.patchLinkPrefix || Meteor.settings.public.patchLinkSufix) {
      var addr = this;
      if (Meteor.settings.public.patchLinkPrefix)
        addr = Meteor.settings.public.patchLinkPrefix + this;
      if (Meteor.settings.public.patchLinkSufix)
        addr += Meteor.settings.public.patchLinkSufix;
      window.open(addr);
    }
    evt.preventDefault();
  },
  'click .js-remove-patch'(evt) {
    const card = Cards.findOne(Session.get('currentCard'));
    card.removePatch(this.trim());
    Popup.close();
    evt.preventDefault();
  },
  'click .js-add-patch': Popup.open('createPatch'),
});

Template.createPatchPopup.events({
  'submit .create-patch'(evt, tpl) {
    const card = Cards.findOne(Session.get('currentCard'));
    const name = tpl.$('#patchName').val().trim();
    if (name.length > 0) {
      card.addPatch(name);
      Popup.close();
    }
    evt.preventDefault();
  },
});
