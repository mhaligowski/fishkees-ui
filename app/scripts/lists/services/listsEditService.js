angular.module('flashcardListModule.services')
  .service('listsEditService', function() {
        this.getLists = function() {
            return [
                {
                    'id': 1,
                    'title': 'Spanish for beginners',
                    'create_date': 1379617022000
                },
                {
                    'id': 2,
                    'title': 'Russian for intermediate',
                    'create_date': 1339347167000
                }
            ];
        }

        this.addToLists = function(lists, newList) {
            // FlashcardLists.save(newList)
            newList.createDate = new Date();
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