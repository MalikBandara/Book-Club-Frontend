export type IssueBook = {
    id: string;
    book: string;
    reader: string;
    dueDate: string;
    lendingDate: string;
    status?: string;
};

export type IssueBookFormData = {
    book: string;
    reader: string;
    dueDate: string;
    lendingDate: string;
    status?: string;
};
