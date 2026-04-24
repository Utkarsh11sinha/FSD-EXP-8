const {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography
} = MaterialUI;

const { useForm, Controller } = ReactHookForm;
const { useState } = React;

function LoginFormExperiment() {
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [userState, setUserState] = useState("signed-out");
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (values) => {
    setSubmitting(true);
    setFeedback(null);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    if (values.email === "student@demo.com" && values.password === "react123") {
      setFeedback({ severity: "success", text: "Login successful. Authenticated session created." });
      setUserState("authenticated");
    } else {
      setFeedback({ severity: "error", text: "Invalid credentials. Try student@demo.com / react123." });
      setUserState("signed-out");
    }

    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        py: 4
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1.1fr 0.9fr" },
            gap: 3
          }}
        >
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 6,
              border: "1px solid rgba(184, 109, 19, 0.12)",
              background: "rgba(255,255,255,0.82)",
              backdropFilter: "blur(12px)"
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "#d06d18", letterSpacing: "0.18em", fontWeight: 800 }}
            >
              Experiment 04
            </Typography>
            <Typography variant="h3" sx={{ mt: 1.5, fontWeight: 800, lineHeight: 1.05 }}>
              Secure Login Form
            </Typography>
            <Typography sx={{ mt: 2, color: "#6c5c4d", lineHeight: 1.8 }}>
              This demo uses React state, controlled inputs, and validation rules to manage
              a responsive login experience with clear feedback states.
            </Typography>

            <Box component="form" sx={{ mt: 4 }} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={2.5}>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address"
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Email Address"
                      fullWidth
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">@</InputAdornment>
                      }}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Password"
                      type="password"
                      fullWidth
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                    />
                  )}
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={submitting}
                  sx={{
                    py: 1.5,
                    borderRadius: 999,
                    fontWeight: 700,
                    background: "linear-gradient(135deg, #ff9d2b, #f06d1b)"
                  }}
                >
                  {submitting ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : "Sign In"}
                </Button>

                {feedback && <Alert severity={feedback.severity}>{feedback.text}</Alert>}
              </Stack>
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              borderRadius: 6,
              background: "linear-gradient(160deg, #1b1713, #33251a)",
              color: "#fff8f0"
            }}
          >
            <Typography
              variant="overline"
              sx={{ color: "#ffc172", letterSpacing: "0.16em", fontWeight: 800 }}
            >
              State Overview
            </Typography>
            <Typography variant="h4" sx={{ mt: 1.5, fontWeight: 800 }}>
              Current Session
            </Typography>

            <Stack spacing={2} sx={{ mt: 3 }}>
              <Box sx={{ p: 2.5, borderRadius: 4, background: "rgba(255,255,255,0.06)" }}>
                <Typography variant="body2" sx={{ opacity: 0.74 }}>
                  User state
                </Typography>
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 700, textTransform: "capitalize" }}>
                  {userState.replace("-", " ")}
                </Typography>
              </Box>

              <Box sx={{ p: 2.5, borderRadius: 4, background: "rgba(255,255,255,0.06)" }}>
                <Typography variant="body2" sx={{ opacity: 0.74 }}>
                  Demo credentials
                </Typography>
                <Typography variant="body1" sx={{ mt: 1.2, lineHeight: 1.8 }}>
                  Email: <strong>student@demo.com</strong><br />
                  Password: <strong>react123</strong>
                </Typography>
              </Box>

              <Box sx={{ p: 2.5, borderRadius: 4, background: "rgba(255,255,255,0.06)" }}>
                <Typography variant="body2" sx={{ opacity: 0.74 }}>
                  Validation goals
                </Typography>
                <Typography variant="body1" sx={{ mt: 1.2, lineHeight: 1.8 }}>
                  Responsive UI, client-side validation, controlled state, and submission feedback.
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<LoginFormExperiment />);