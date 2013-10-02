'use strict'

describe('Service: ListEditCtrlService', function () {

  // load the controller's module
  beforeEach(module('flashcardListModule.services'));

  var ListsEditService, lists;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($injector) {
    
    // mock controller
    ListsEditService = $injector.get('listsEditService');

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

  }));

  it('should add new list', function() {
    // given
    expect(lists.length).toEqual(3);

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
    // given
    expect(lists.length).toBe(3);

    // when
    ListsEditService.removeFromLists(lists, {
        'id': 2,
        'title': 'Russian for intermediate'
    });


    // then
    expect(lists.length).toBe(2);
    expect(lists[0].id).toBe(1);
    expect(lists[1].id).toBe(3);
  });

  it('should edit the list', function() {
    // given
    expect(lists.length).toBe(3);

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
