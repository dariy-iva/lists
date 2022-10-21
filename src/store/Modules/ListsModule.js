export default {
  state: () => ({
    lists: [],
    openedListsId: [],
  }),
  mutations: {
    setLists(state, payload) {
      state.lists = payload.lists;
    },
    setCheckedItem(state, payload) {
      const {listId, itemId, isChecked} = payload;
      state.lists.find(list => list.id === listId).items.find(item => item.id === itemId).checked = isChecked;
    },
    setCountItem(state, payload) {
      const {listId, itemId, count} = payload;
      state.lists.find(list => list.id === listId).items.find(item => item.id === itemId).count = count;
    },
    setColorItem(state, payload) {
      const {listId, itemId, color} = payload;
      state.lists.find(list => list.id === listId).items.find(item => item.id === itemId).color = color;
    },
    updateOpenedListId(state, payload) {
      const {listId, isOpen} = payload;
      isOpen
        ? state.openedListsId.push(listId)
        : state.openedListsId = state.openedListsId.filter(id => id !== listId)
    },
  },

  actions: {
    getLists({commit}) {
      const lists = [{
        id: 1,
        name: 'List 1',
        items: [{
          id: 1,
          name: 'Item 1',
          count: 10,
          color: '#FF0000',
          checked: true,
        },
          {
            id: 2,
            name: 'Item 2',
            count: 16,
            color: '#FFFF00',
            checked: true,
          },
          {
            id: 3,
            name: 'Item 3',
            count: 40,
            color: '#00FF00',
            checked: true,
          },
          {
            id: 4,
            name: 'Item 4',
            count: 0,
            color: '#0000FF',
            checked: false,
          },],
      },
        {
          id: 2,
          name: 'List 2',
          items: [{
            id: 1,
            name: 'Item 1',
            count: 15,
            color: '#FA8072',
            checked: true,
          },
            {
              id: 2,
              name: 'Item 2',
              count: 3,
              color: '#FFB6C1',
              checked: true,
            },
            {
              id: 3,
              name: 'Item 3',
              count: 8,
              color: '#66CDAA',
              checked: false,
            },
            {
              id: 4,
              name: 'Item 4',
              count: 11,
              color: '#00FA9A',
              checked: false,
            },
            {
              id: 5,
              name: 'Item 5',
              count: 1,
              color: '#EE82EE',
              checked: false,
            }, {
              id: 6,
              name: 'Item 6',
              count: 0,
              color: '#B0C4DE',
              checked: true,
            },
            {
              id: 7,
              name: 'Item 7',
              count: 0,
              color: '#66CDAA',
              checked: false,
            },
            {
              id: 8,
              name: 'Item 8',
              count: 21,
              color: '#FF00FF',
              checked: true,
            },
            {
              id: 9,
              name: 'Item 9',
              count: 13,
              color: '#FFE4E1',
              checked: true,
            },],
        },
        {
          id: 3,
          name: 'List 3',
          items: [{
            id: 1,
            name: 'Item 1',
            count: 0,
            color: '#B0C4DE',
            checked: false,
          },
            {
              id: 2,
              name: 'Item 2',
              count: 9,
              color: '#87CEEB',
              checked: true,
            },
            {
              id: 3,
              name: 'Item 3',
              count: 32,
              color: '#6495ED',
              checked: true,
            },
            {
              id: 4,
              name: 'Item 4',
              count: 1,
              color: '#4169E1',
              checked: true,
            },
            {
              id: 5,
              name: 'Item 5',
              count: 3,
              color: '#0000CD',
              checked: false,
            },],
        },
        {
          id: 4,
          name: 'List 4',
          items: [{
            id: 1,
            name: 'Item 1',
            count: 14,
            color: '#FF00FF',
            checked: true,
          },
            {
              id: 2,
              name: 'Item 2',
              count: 7,
              color: '#D3D3D3',
              checked: true,
            },
            {
              id: 3,
              name: 'Item 3',
              count: 21,
              color: '#FFE4E1',
              checked: true,
            },
            {
              id: 4,
              name: 'Item 4',
              count: 14,
              color: '#4169E1',
              checked: true,
            },],
        },
        {
          id: 5,
          name: 'List 5',
          items: [{
            id: 1,
            name: 'Item 1',
            count: 9,
            color: '#ADFF2F',
            checked: false,
          },
            {
              id: 2,
              name: 'Item 2',
              count: 18,
              color: '#483D8B',
              checked: false,
            },
            {
              id: 3,
              name: 'Item 3',
              count: 0,
              color: '#FFFF00',
              checked: false,
            },
            {
              id: 4,
              name: 'Item 4',
              count: 5,
              color: '#2F4F4F',
              checked: false,
            },
            {
              id: 5,
              name: 'Item 5',
              count: 0,
              color: '#800000',
              checked: false,
            },
            {
              id: 6,
              name: 'Item 6',
              count: 0,
              color: '#F4A460',
              checked: false,
            },
            {
              id: 7,
              name: 'Item 7',
              count: 0,
              color: '#00FA9A',
              checked: false,
            },],
        },];

      commit({
        type: 'setLists',
        lists: lists,
      })
    },
  },
}