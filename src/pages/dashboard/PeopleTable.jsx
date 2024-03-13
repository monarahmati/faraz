import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Button,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const PeopleTable = ({ people , name  }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState('');

  const handleDelete = (personName) => {
    setSelectedPerson(personName);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {

    setDeleteModalOpen(false);

    const response = httpInterceptedService.delete(
        `/course/${selectedPerson}`
    );

    toast.promise(
        response,
        {
            pending: "در حال حذف ...",
            success: {
                render() {
                    const url = new URL(window.location.href);
                    navigate(url.pathname + url.search);
                    return "عملیات با موفقیت انجام شد";
                },
            },
            error: {
                render({ data }) {
                    return data.response.data.code;

                },
            },
        },
        {
            position: toast.POSITION.BOTTOM_LEFT,
        }
    );

  };

  const handleCancelDelete = () => {
    setDeleteModalOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* {names.map((name, index) => (
                <TableCell key={index}>{name}</TableCell>
              ))} */}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow key={person.id}>
                {Object.values(person).map((value, index) => (
                  <TableCell key={index}>{value}</TableCell>
                ))}
                <TableCell>
                  <IconButton onClick={() => handleDelete(person.title)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={deleteModalOpen} onClose={handleCancelDelete}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: 20 }}>
          <Typography variant="h6" gutterBottom>
            Are you sure to delete {selectedPerson}?
          </Typography>
          <Button onClick={handleConfirmDelete} color="error" variant="contained" style={{ marginRight: 10 }}>Yes</Button>
          <Button onClick={handleCancelDelete} color="primary" variant="contained">No</Button>
        </div>
      </Modal>
    </div>
  );
};

export default PeopleTable;