export type IssueBook = {
    id: string;
    book: string;
    bookTitle: string;
    readerName: string;
    readerEmail: string;
    reader: string;
    dueDate: string;
    lendingDate: string;
    status?: string;
    bookDetails?: {
        id: string;
        title: string;
        author?: string;
        publisher?: string;
        genre?: string;
    };
    readerDetails?: {
        id: string;
        name: string;
        email?: string;
        address?: string;
        // add more fields if needed
    };
};

export type IssueBookFormData = {
    book: string;
    bookTitle: string;
    readerName: string;
    readerEmail: string;
    reader: string;
    dueDate: string;
    lendingDate: string;
    status?: string;
    bookDetails?: {
        id: string;
        title: string;
        author?: string;
        publisher?: string;
        genre?: string;
        // add more fields if needed
    };
    readerDetails?: {
        id: string;
        name: string;
        email?: string;
        address?: string;
        // add more fields if needed
    };
};
