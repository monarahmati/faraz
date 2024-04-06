import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import {
  Typography,
  Box,
  Grid,
  IconButton,
  Modal,
  Button,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import useModalStore from "../../store/auth";
import { useCheckToken } from "../../hooks/useChecktToken";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#f1f1f3",
  border: "2px solid #d4d6d9",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
};

const Dashboard = () => {
  const navigate = useNavigate();
  useCheckToken()
  // const [modalOpen, setModalOpen] = useState(false);
  // const [selectedRowId, setSelectedRowId] = useState(null);
  const [rows, setRows] = useState(null);

  const { modalOpen, selectedRowId, setModalOpen, setSelectedRowId } =
    useModalStore();

  const {
    data: userData,
    isLoading,
    isError,
    error,
  } = useQuery(["userData"], async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/login");
      throw new Error("No token available");
    }

    const userCookie = Cookies.get("user");
    if (!userCookie) {
      throw new Error("No user data available");
    }

    return JSON.parse(userCookie);
  });

  useEffect(() => {
    if (userData) {
      const initialRows = [
        {
          id: 1,
          name: "John Doe",
          mobile: 1234567890,
          email: "john@example.com",
        },
        {
          id: 2,
          name: userData.name,
          mobile: userData.mobile,
          email: userData.email,
        },
      ];
      setRows(initialRows);
    }
  }, [userData]);

  const handleDelete = (id) => {
    setSelectedRowId(id);
    setModalOpen(true);
  };

  const handleDeleteRows = (id) => {
    setRows(rows.filter((row) => row.id !== id));
    setModalOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Name", width: 180, editable: true },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 180,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    { field: "email", headerName: "Email", width: 280, editable: true },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <IconButton onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (
    <>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "100vh" }}
      >
      <Typography  variant="h4">{userData.name} خوش آمدید</Typography>
        <Box
          xs={10}
          md={8}
          lg={6}
          sx={{ padding: "2rem", height: 450, width: "100%" }}
        >
          <DataGrid
            rows={rows || []}
            columns={columns}
            initialState={{ pagination: { paginationModel: { pageSize: 6 } } }}
            pageSizeOptions={[5]}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            disableRowSelectionOnClick
            style={{ width: "100%" }}
          />
        </Box>
      </Grid>
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={styleModal}>
          <Typography
            variant="h6"
            id="modal-description"
            style={{ paddingBottom: "30px" }}
          >
            آیا از حذف کاربر مطمئن هستید ؟
          </Typography>
          <Button
            variant="contained"
            onClick={() => setModalOpen(false)}
            style={{ margin: "0 10px" }}
          >
            {" "}
            انصراف
          </Button>
          <Button
            variant="contained"
            onClick={() => handleDeleteRows(selectedRowId)}
            style={{ margin: "0 10px" }}
          >
            حذف{" "}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Dashboard;
