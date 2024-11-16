import { useState, useContext } from "react";
import { UserContext } from "../UserContext";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Alert,
} from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function UpdateProfilePage() {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState(user?.email || "");
  const [name, setName] = useState(user?.name || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  async function handleUpdate(e: any) {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:4000/updateProfile", {
        email,
        name,
        oldPassword,
        newPassword,
      });

      if (response.data.success) {
        setUser(response.data.user); // Update the user context
        setSuccess("Profile updated successfully!");
        toast.success("Profile updated successfully!");
        await axios.post("http://localhost:4000/logout");
        setUser(null);
        navigate("/");
      } else {
        setError(response.data.message || "Failed to update profile.");
        toast.error(response.data.message || "Failed to update profile.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  }

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={handleUpdate}
        sx={{
          width: "100%",
          p: 4,
          backgroundColor: "#f7f9fc",
          borderRadius: 4,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, textAlign: "center" }}>
          Update Profile
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <TextField
          label="Email"
          value={email}
          fullWidth
          sx={{ mb: 3 }}
          disabled
        />
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
          required
        />
        <TextField
          label="Old Password"
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
          required
        />
        <TextField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ py: 1.5 }}
        >
          Update Profile
        </Button>
      </Box>
    </Container>
  );
}