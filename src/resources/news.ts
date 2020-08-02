export class News {
    constructor() {

    }
    created_at: Date;
    created_at_i: number;
    title: string;
    url: string;
    author: string;
    num_comments: number = 0;
    points: number;
    objectID: string;
    diff_time: any;
}

export class Obj {
    hits: News[];
    nbPages: number;
}
