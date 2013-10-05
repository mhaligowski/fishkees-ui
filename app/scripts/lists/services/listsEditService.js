angular.module('flashcardListModule.services')
  .service('listsEditService', function(FlashcardLists) {
        this.getLists = function() {
            return FlashcardLists.query().then(function(response) {
                return response;
            });
        }

        this.addToLists = function(lists, newList) {
            // FlashcardLists.save(newList)
            lists.push(newList);
        }

        this.removeFromLists = function(lists, toRemove) {
            // FlashcardLists.remove(toRemove)
            for (var l in lists) {
                if (lists[l].id == toRemove.id) {
                    lists.splice(l, 1);
                    return;
                }     
            }
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