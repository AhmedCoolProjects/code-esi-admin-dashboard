export type DeleteDialogProps = {
  open: boolean;
  handleClose: () => void;
  title: string;
  description: string;
  personToDeleteId: string;
  lastMsg: string;
};

export type PersonProps = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  linkedin: string;
  profession: string;
  image: string;
  category: string;
  post: string;
  is_hidden: boolean | string;
};

export type PersonDialogProps = {
  open: boolean;
  onClose: () => void;
  setPerson: (person: PersonProps) => void;
  person: PersonProps;
  handleClickOpen: () => void;
  file: File | null;
  setFile: (file: File) => void;
};
