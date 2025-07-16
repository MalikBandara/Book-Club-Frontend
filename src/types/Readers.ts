// display retrieve or edit

export type Readers = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  memberShipId: string;
  borrowedBooks: [];
};

// create new reader address

export type ReaderFormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  memberShipId: string;
};
