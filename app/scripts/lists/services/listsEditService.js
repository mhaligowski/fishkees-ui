angular.module('flashcardListModule.services')
  .service('listsEditService', function(FlashcardLists) {
        this.getLists = function() {
            return FlashcardLists.query();
        };

        this.addToLists = function(lists, newList) {
            var newFlashcardList = FlashcardLists.save(newList);
            lists.push(newFlashcardList);

            return newFlashcardList;
        };

        this.removeFromLists = function(lists, toRemove) {
            var removed = FlashcardLists.remove(
                {'flashcardListId': toRemove.id}, 
                function(response) {
                    for (var l in lists) {
                        if (lists[l].id == response.id) {
                            lists.splice(l, 1);
                            break;
                        }
                    }
                });

            return removed;
        }

        this.updateLists = function(lists, toUpdate) {
            FlashcardLists.update(toUpdate, function(response) {
                for (var l in lists) {
                    if (lists[l].id == response.id) {
                        lists[l].title = response.title;
                        return;
                    }
                }                
            });
        }
  })