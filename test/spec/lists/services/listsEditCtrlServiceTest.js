'use strict'

describe('Service: ListEditCtrlService', function () {

    // load the controller's module
    beforeEach(module('flashcardListModule.services'));

    var ListsEditService, lists, $httpBackend;

    // Initialize the controller and a mock scope
    beforeEach(function() { 
        lists = [
            {
                'id': "realId1",
                'title': 'Spanish for beginners',
                'create_date': 1379617022000
            },
            {
                'id': "realId2",
                'title': 'Russian for intermediate',
                'create_date': 1339347167000
            },
            {
                'id': "realId3",
                'title': 'Something completely different',
                'create_date': 1339347167000
            }
        ];

        inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
        });


        inject(function ($injector) {
            ListsEditService = $injector.get('listsEditService');
        });
    });

    it('should show 3 lists at the beginning', function() {
        //given
        $httpBackend.expectGET('/service/flashcardlists').respond(lists);

        // when
        var testLists = ListsEditService.getLists();
        $httpBackend.flush();
        
        // then
        expect(testLists.length).toBe(3);
    });

    it('should add new list', function() {
        // given
        $httpBackend.expectPOST('/service/flashcardlists', { 'title': 'MockList' })
            .respond(201, {
                "id": "someId",
                "title": "MockList",
                "create_date": 12345
            });

        // when
        var newList = [];
        ListsEditService.addToLists(newList, { 'title': 'MockList' });
        $httpBackend.flush();

        // then
        expect(newList.length).toEqual(1);
        expect(newList[0].create_date).toBe(12345);
        expect(newList[0].id).toBe("someId");
    });

    it('should remove the middle list', function() {
        // given
        $httpBackend.expectDELETE('/service/flashcardlists/realId2')
                    .respond(200, lists[1]);

        // when
        var removedList = ListsEditService.removeFromLists(lists, {
            'id': "realId2", 'title': 'Russian for intermediate'
        });
        $httpBackend.flush();

        // then

        expect(removedList).not.toBeUndefined();
        expect(removedList.id).not.toBeUndefined();
        expect(lists.length).toBe(2);
        expect(lists[0].id).toBe("realId1");
        expect(lists[1].id).toBe("realId3");
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
        expect(lists[0].id).toBe("realId1");
        expect(lists[0].create_date).toEqual(1379617022000);
    });
});
