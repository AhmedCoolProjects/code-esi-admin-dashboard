import Head from "next/head";
import { useState } from "react";
import {
  DeleteDialog,
  Header,
  PersonDialog,
  PersonTable,
} from "../../../../../src/components";
import { PersonProps } from "../../../../../types";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [personToDeleteId, setPersonToDeleteId] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [person, setPerson] = useState<PersonProps>({
    first_name: "",
    last_name: "",
    email: "",
    linkedin: "",
    profession: "",
    image: "",
    category: "",
    post: "",
    is_hidden: false,
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
    setPersonToDeleteId("");
  };
  const handleDeleteOpen = (id: string) => {
    setPersonToDeleteId(id);
    setOpenDelete(true);
  };
  const handleClose = () => {
    setOpen(false);
    setPerson({
      id: "",
      first_name: "",
      last_name: "",
      email: "",
      linkedin: "",
      profession: "",
      image: "",
      category: "",
      post: "",
      is_hidden: false,
    });
    setFile(null);
  };

  return (
    <div>
      <Head>
        <title>CODE ESI ADMIN | PERSONS</title>
      </Head>
      <Header title="CODE ESI ADMIN | PERSONS" />
      <div className="min-h-[400px] space-y-6 py-6">
        <PersonDialog
          open={open}
          onClose={handleClose}
          handleClickOpen={handleClickOpen}
          person={person}
          setPerson={setPerson}
          file={file}
          setFile={setFile}
        />
        <DeleteDialog
          open={openDelete}
          handleClose={handleDeleteClose}
          personToDeleteId={personToDeleteId}
          title={"Delete Person with id: " + personToDeleteId}
          description={"Are you sure you want to delete this person?"}
          lastMsg={"Person deleted successfully"}
        />
        <PersonTable
          handleClickOpen={handleClickOpen}
          setPerson={setPerson}
          handleDeleteOpen={handleDeleteOpen}
        />
      </div>
    </div>
  );
}
