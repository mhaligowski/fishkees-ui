angular.module('flashcardListModule.services')
  .service('listsEditService', function(FlashcardLists) {
        this.getLists = function() {
            return FlashcardLists
                    .query()
                    .then(function(response) {
                        return response;
                    });
        };

        this.addToLists = function(lists, newList) {
            return FlashcardLists
                    .save(newList)
                    .then(function(response) {
                        lists.push(response);
                        return response;
                    });
        };

        this.removeFromLists = function(lists, toRemove) {
            return FlashcardLists
                    .remove(toRemove)
                    .then(function(response) {
                        for (var l in lists) {
                            if (lists[l].id == response.id) {
                                lists.splice(l, 1);
                                break;
                            }
                        }

                        return response;
                    });
        }

        this.updateLists = function(lists, toUpdate) {
            // FlashcardLists.save(toUpdate);
            for (var l in lists) {
                if (lists[l].id == toUpdate.id) {
                    lists[l].title = toUpdate.title;
                    return;
                }
            }
        }


  })