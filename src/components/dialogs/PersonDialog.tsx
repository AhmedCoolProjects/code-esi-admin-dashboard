import { useMutation } from "@apollo/client";
import { MdCloudUpload } from "react-icons/md";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  IconButton,
} from "@mui/material";
import {
  CREATE_PERSON,
  UPDATE_PERSON,
} from "../../../apollo/graphql/mutations";
import { PersonDialogProps } from "../../../types";
import { GET_PEOPLE } from "../../../apollo/graphql/queries";
import { THEME } from "../../constants";
import { appAxios } from "../../axios";

export function PersonDialog(props: PersonDialogProps) {
  const { open, onClose, setPerson, person, handleClickOpen, file, setFile } =
    props;
  const [handleSubmit, { data, loading, error }] = useMutation(CREATE_PERSON, {
    variables: {
      firstName: person.first_name,
      lastName: person.last_name,
      email: person.email,
      linkedin: person.linkedin,
      profession: person.profession,
      image: person.image,
      category: person.category,
      post: person.post,
      isHidden: person.is_hidden === "true",
    },
    onCompleted: () => {
      onClose();
      alert("Person added successfully");
    },
    onError: (error) => {
      console.log(error);
    },
    refetchQueries: [
      {
        query: GET_PEOPLE,
      },
    ],
  });
  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file as string | Blob);
    formData.append("webapplink", "admin.codeesi.com");
    formData.append("title", "persons");

    await appAxios.post("/storage/files", formData).then((res) => {
      setPerson({ ...person, image: res.data });
    });
  };

  // update person function
  const [updatePerson, { data: updateData, loading: updateLoading }] =
    useMutation(UPDATE_PERSON, {
      variables: {
        updatePersonId: person.id,
        firstName: person.first_name,
        lastName: person.last_name,
        linkedin: person.linkedin,
        email: person.email,
        profession: person.profession,
        image: person.image,
        category: person.category,
        post: person.post,
        isHidden: person.is_hidden === "true",
      },
      onCompleted: () => {
        onClose();
        alert("Person updated successfully");
      },
      onError: (error) => {
        console.log(error);
      },
      refetchQueries: [
        {
          query: GET_PEOPLE,
        },
      ],
    });
  return (
    <div className="w-full">
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        color="primary"
        size="large"
      >
        add person
      </Button>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Person</DialogTitle>
        <DialogContent className="space-y-3">
          <DialogContentText>Add Person to the database.</DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="first_name"
            label="First Name"
            type="text"
            fullWidth
            variant="standard"
            value={person.first_name}
            onChange={(e) =>
              setPerson({ ...person, first_name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="last_name"
            label="Last Name"
            type="text"
            fullWidth
            variant="standard"
            value={person.last_name}
            onChange={(e) =>
              setPerson({ ...person, last_name: e.target.value })
            }
          />
          <TextField
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            variant="standard"
            value={person.email}
            onChange={(e) => setPerson({ ...person, email: e.target.value })}
          />
          <TextField
            margin="dense"
            id="linkedin"
            label="Linkedin"
            type="text"
            fullWidth
            variant="standard"
            value={person.linkedin}
            onChange={(e) => setPerson({ ...person, linkedin: e.target.value })}
          />
          <TextField
            margin="dense"
            id="profession"
            label="Profession"
            type="text"
            fullWidth
            variant="standard"
            value={person.profession}
            onChange={(e) =>
              setPerson({ ...person, profession: e.target.value })
            }
          />
          {/* input for image upload */}
          <TextField
            margin="dense"
            id="image"
            label="Image"
            type="file"
            fullWidth
            variant="standard"
            onChange={(e) => {
              if (e) {
                let targetLocal = e.target as HTMLInputElement;
                if (targetLocal.files) {
                  setFile(targetLocal.files[0]);
                }
              }
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    disabled={!file || person.image !== ""}
                    onClick={uploadFile}
                  >
                    <MdCloudUpload color={THEME.primary.main} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth>
            <InputLabel id="person-category">Category</InputLabel>
            <Select
              labelId="person-category"
              value={person.category}
              label="Category"
              onChange={(e) =>
                setPerson({ ...person, category: e.target.value })
              }
            >
              <MenuItem value="board">Board</MenuItem>
              <MenuItem value="member">Member</MenuItem>
              <MenuItem value="guest">Guest</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="person-post">Post</InputLabel>
            <Select
              labelId="person-post"
              value={person.post}
              label="Post"
              onChange={(e) => setPerson({ ...person, post: e.target.value })}
            >
              <MenuItem value="prof">Prof</MenuItem>
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="laureate">Laureate</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="person-is-hiddent">Is Hidden</InputLabel>
            <Select
              labelId="person-is-hiddent"
              value={person.is_hidden}
              label="Is Hidden"
              onChange={(e) =>
                setPerson({ ...person, is_hidden: e.target.value })
              }
            >
              <MenuItem value="false">NO</MenuItem>
              <MenuItem value="true">YES</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>

          {person.id && person.image && (
            <Button
              onClick={() => {
                updatePerson();
              }}
            >
              Update Person
            </Button>
          )}
          {!person.id && (
            <Button
              disabled={
                !person.first_name ||
                !person.last_name ||
                !person.category ||
                !person.profession ||
                !person.image ||
                !person.post
              }
              onClick={() => {
                handleSubmit();
              }}
            >
              Add Person
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
