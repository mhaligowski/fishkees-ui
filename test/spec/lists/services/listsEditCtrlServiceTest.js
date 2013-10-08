'use strict'

describe('Service: ListEditCtrlService', function () {

    // load the controller's module
    beforeEach(module('flashcardListModule.services'));

    var ListsEditService, lists, mockFlashcardLists, rootScope, q;

    // Initialize the controller and a mock scope
    beforeEach(function() { 
        lists = [
            {
                'id': 1,
                'title': 'Spanish for beginners',
                'create_date': 1379617022000
            },
            {
                'id': 2,
                'title': 'Russian for intermediate',
                'create_date': 1339347167000
            },
            {
                'id': 3,
                'title': 'Something completely different',
                'create_date': 1339347167000
            }
        ];

        mockFlashcardLists = {
            query: function() { 
                var deferred = q.defer();
                deferred.resolve(lists);
                return deferred.promise;
            },
            remove: function(list) {
                var deferred = q.defer();
                deferred.resolve(list);
                return deferred.promise;
            }
        }


        module(function ($provide) {
            $provide.value('FlashcardLists', mockFlashcardLists);
        })

        inject(function ($q, $rootScope) {
            q = $q;
            rootScope = $rootScope;
        });

        inject(function ($injector) {
            ListsEditService = $injector.get('listsEditService');
            $injector.get('$rootScope');
        });
    });

    it('should show 3 lists at the beginning', function() {
        // when
        var testLists = [];
        ListsEditService
            .getLists()
            .then(function(response) {
                testLists = response;
            });
        rootScope.$apply();
        
        // then
        expect(testLists.length).toBe(3);
    });

    it('should add new list', function() {
        // when
        ListsEditService.addToLists(lists, {
            'title': 'MockList',
            'create_date': 12345
        });

        // then
        expect(lists.length).toEqual(4);
        expect(lists[3].create_date).not.toBeUndefined();
    });

    it('should remove the middle list', function() {
        // when
        var testList = null;
        ListsEditService
            .removeFromLists(lists, {
                'id': 2,
                'title': 'Russian for intermediate'
            })
            .then(function(response) {
                testList = response;
            });
        rootScope.$apply();

        // then
        expect(testList.id).toBe(2);
        expect(lists.length).toBe(2);
        expect(lists[0].id).toBe(1);
        expect(lists[1].id).toBe(3);
    });

    it('should edit the list', function() {
        // when
        ListsEditService.updateLists(lists, {
            'id': 1,
            'title': 'Klingon for beginners'
        });

        // then
        expect(lists.length).toBe(3);
        expect(lists[0].title).toMatch('Klingon for beginners');
        expect(lists[0].id).toBe(1);
        expect(lists[0].create_date).toEqual(1379617022000);
    });
});
