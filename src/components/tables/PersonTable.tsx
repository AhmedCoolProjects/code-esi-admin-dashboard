import { useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from "@mui/material";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import moment from "moment";
import { MdDeleteForever, MdModeEdit } from "react-icons/md";
import { THEME } from "../../constants";
import { GET_PEOPLE } from "../../../apollo/graphql/queries";
import { PersonProps } from "../../../types";

type columnsProps = {
  id: string;
  label: string;
  minWidth: number;
};

const columns: columnsProps[] = [
  { id: "id", label: "ID", minWidth: 180 },
  { id: "first_name", label: "First Name", minWidth: 180 },
  { id: "last_name", label: "Last Name", minWidth: 180 },
  { id: "email", label: "Email", minWidth: 180 },
  { id: "linkedin", label: "Linkedin", minWidth: 180 },
  { id: "profession", label: "Profession", minWidth: 180 },
  { id: "image", label: "Image", minWidth: 180 },
  { id: "category", label: "Category", minWidth: 180 },
  { id: "post", label: "Post", minWidth: 180 },
  { id: "is_hidden", label: "Is Hidden", minWidth: 180 },
  // { id: "createdAt", label: "Created At", minWidth: 180 },
  // { id: "updatedAt", label: "Updated At", minWidth: 180 },
];

type PersonTableProps = {
  setPerson: (person: PersonProps) => void;
  handleClickOpen: () => void;
  handleDeleteOpen: (id: string) => void;
};

export function PersonTable(props: PersonTableProps) {
  const { setPerson, handleClickOpen, handleDeleteOpen } = props;
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const { data: personsData, loading: personsLoading } = useQuery(GET_PEOPLE);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const updatePerson = (personToUpdate: PersonProps) => {
    setPerson({
      id: personToUpdate.id,
      first_name: personToUpdate.first_name,
      last_name: personToUpdate.last_name,
      email: personToUpdate.email,
      linkedin: personToUpdate.linkedin,
      profession: personToUpdate.profession,
      image: personToUpdate.image,
      category: personToUpdate.category,
      post: personToUpdate.post,
      is_hidden: personToUpdate.is_hidden,
    });
    handleClickOpen();
  };
  const deletePerson = (personToDeleteId: string) => {
    handleDeleteOpen(personToDeleteId);
  };
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 480 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
              <TableCell style={{ minWidth: 100 }}></TableCell>
              <TableCell style={{ minWidth: 100 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {personsData &&
              personsData.getPeople
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((person: PersonProps) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={person.id}
                    >
                      {columns.map((column) => {
                        const keys = Object.keys(person);
                        const indexKey = keys.indexOf(column.id);
                        const values = Object.values(person);
                        const value: string = values[indexKey] as string;
                        return (
                          <TableCell key={column.id}>
                            {column.id === "image" &&
                            value &&
                            value.startsWith(
                              "https://firebasestorage.googleapis.com"
                            ) ? (
                              <Image
                                src={value}
                                alt={`${person.first_name} ${person.last_name}`}
                                width={100}
                                height={100}
                                objectFit="cover"
                                className="rounded-lg"
                              />
                            ) : column.id === "createdAt" ||
                              column.id === "updatedAt" ? (
                              moment(parseInt(value)).format(
                                "DD MM YYYY, h:mm:ss"
                              )
                            ) : column.id === "is_hidden" ? (
                              value ? (
                                <h1>Yes</h1>
                              ) : (
                                <h1>No</h1>
                              )
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                      <TableCell>
                        <IconButton onClick={() => updatePerson(person)}>
                          <MdModeEdit
                            size={28}
                            style={{
                              color: THEME.primary.main,
                            }}
                          />
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            if (person.id) {
                              deletePerson(person.id);
                            }
                          }}
                        >
                          <MdDeleteForever
                            size={28}
                            style={{
                              color: "red",
                            }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 15, 25, 50, 100]}
        component="div"
        count={personsLoading ? 0 : personsData.getPeople.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
