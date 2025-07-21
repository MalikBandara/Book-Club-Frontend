export type IssueBook = {
    id: string;
    book: string;
    bookTitle: string;
    readerName: string;
    reader: string;
    dueDate: string;
    lendingDate: string;
    status?: string;
};

export type IssueBookFormData = {
    book: string;
    bookTitle: string;
    readerName: string;
    reader: string;
    dueDate: string;
    lendingDate: string;
    status?: string;
};
