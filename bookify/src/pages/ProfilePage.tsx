import { Navigate, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import {
  Avatar,
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  Button,
  Grid,
} from "@mui/material";

import axios from "axios";

export default function ProfilePage() {
  const { user, loading, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function logout() {
    await axios.post(
      "http://localhost:4000/logout",
    );
    setUser(null);
    navigate("/");
  }

  if (!loading) {
    return "Loading";
  }

  if (loading && !user) return <Navigate to="/login" />;

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: 5,
        mb: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          py: 4,
          px: 3,
          backgroundColor: "#f7f9fc",
          borderRadius: 4,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
        }}
      >
        {/* Profile Section */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            textAlign: "center",
            backgroundColor: "#ffffff",
            borderRadius: 2,
          }}
        >
          <Avatar
            src={user?.name || undefined}
            alt={user?.name || "User"}
            sx={{
              width: 120,
              height: 120,
              mx: "auto",
              mb: 3,
              bgcolor: "#3f51b5",
              fontSize: 32,
            }}
          >
            {user?.name?.[0]?.toUpperCase() || "U"}
          </Avatar>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            {user?.name || "Guest User"}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            Member since{" "}
            {new Date(user?.email || "").toLocaleDateString() || "N/A"}
          </Typography>
        </Paper>

        <Grid container spacing={3}>
          {/* My Bookings Section */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                backgroundColor: "#ffffff",
                borderRadius: 2,
                height: "100%",
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  fontWeight: "bold",
                  color: "#3f51b5",
                  textAlign: "center",
                }}
              >
                My Bookings
              </Typography>
              <Divider sx={{ mb: 2 }} />
              {/* Add booking list component here */}
              <Typography color="text.secondary" textAlign="center">
                No bookings found. Start exploring places to stay!
              </Typography>
            </Paper>
          </Grid>

          {/* Conditionally render My Accommodations Section for admin users */}
          {user?.role === "admin" && (
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  backgroundColor: "#ffffff",
                  borderRadius: 2,
                  height: "100%",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontWeight: "bold",
                    color: "#3f51b5",
                    textAlign: "center",
                  }}
                >
                  My Accommodations
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {/* Add accommodations list component here */}
                <Typography color="text.secondary" textAlign="center">
                  No accommodations found. Consider hosting!
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>

        {/* Logout Button at the end */}
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={logout}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              textTransform: "none",
              fontSize: 16,
            }}
          >
            Log Out
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
