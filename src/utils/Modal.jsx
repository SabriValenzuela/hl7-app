import { Modal, Box, Typography } from "@mui/material";

const ModalComponent = ({ open, onClose, children, title }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          maxHeight: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
          borderRadius: 2,
        }}
      >
        {title && (
          <Typography variant="h6" sx={{ mb: 2 }}>
            {title}
          </Typography>
        )}
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
