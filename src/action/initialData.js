
// Data mẫu
export const initialData = {
    boards: [
        {
            id: 'board-1',
            columnOrder: ['column-1','column-2','column-3'],
            columns: [
                {
                    id: 'column-1',
                    boardID: 'board-1',
                    title: 'Cần làm',
                    cardOrder: ['card-1','card-2','card-3','card-4','card-5','card-6','card-7','card-8','card-9','card-10'],
                    cards: [
                        {
                            id: 'card-1',
                            boardID: 'board-1',
                            columnID: 'column-1',
                            title: 'Tiltle card-1',
                            cover: 'https://thidaihoc.vn/wp-content/uploads/2022/03/vanlang-online-truong-dai-hoc-van-lang.jpg'
                        },
                        {id: 'card-2',boardID: 'board-1',columnID: 'column-1',title: 'Tiltle card-2', cover: null },
                        {id: 'card-3',boardID: 'board-1',columnID: 'column-1',title: 'Tiltle card-3', cover: null }
                        // {id: 'card-4',boardID: 'board-1',columnID: 'column-1',title: 'Tiltle card-4', cover: null },
                        // {id: 'card-5',boardID: 'board-1',columnID: 'column-1',title: 'Tiltle card-5', cover: null },
                        // {id: 'card-6',boardID: 'board-1',columnID: 'column-1',title: 'Tiltle card-6', cover: null },
                        // {id: 'card-7',boardID: 'board-1',columnID: 'column-1',title: 'Tiltle card-7', cover: null },
                        // {id: 'card-8',boardID: 'board-1',columnID: 'column-1',title: 'Tiltle card-8', cover: null },
                        // {id: 'card-9',boardID: 'board-1',columnID: 'column-1',title: 'Tiltle card-9', cover: null },
                        // {id: 'card-10',boardID:'board-1',columnID: 'column-1',title: 'Tiltle card-10', cover: null },
                    ]
                },
                {
                    id: 'column-2',
                    boardID: 'board-1',
                    title: 'Đang làm',
                    cardOrder: ['card-11','card-12','card-13'],
                    cards: [
                        {
                            id: 'card-11',
                            boardID: 'board-1',
                            columnID: 'column-1',
                            title: 'Tiltle card-11',
                            cover: null
                        },
                        {id: 'card-12',boardID: 'board-1',columnID: 'column-1',title: 'Tiltle card-12', cover: null },
                        {id: 'card-13',boardID: 'board-1',columnID: 'column-1',title: 'Tiltle card-13', cover: null },
                    ]
                },
                {
                    id: 'column-3',
                    boardID: 'board-1',
                    title: 'Đã làm',
                    cardOrder: ['card-14','card-15','card-16'],
                    cards: [
                        {
                            id: 'card-14',
                            boardID: 'board-1',
                            columnID: 'column-1',
                            title: 'Tiltle card-14',
                            cover: null
                        },
                        {id: 'card-15',boardID: 'board-2',columnID: 'column-1',title: 'Tiltle card-15', cover: null },
                        {id: 'card-16',boardID: 'board-2',columnID: 'column-1',title: 'Tiltle card-16', cover: null },
                    ]
                }
            ]
        }
    ]
}