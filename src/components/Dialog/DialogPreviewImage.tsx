import { Box, Dialog } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  url?: string | null;
};

export const DialogPreviewImage = (props: Props) => {
  const { open, onClose, url } = props;

  return (
    <Dialog
      open={open ?? false}
      onClose={onClose}
      maxWidth={"lg"}
      sx={{
        ".MuiPaper-root": {
          margin: { xs: 0, sm: "10px" },
          boxShadow: "none",
          background: "none",
          overflow: "unset",
        },
      }}
    >
      <Box
        width={1}
        maxHeight={"calc(100vh - 63px)"}
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          img: {
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "contain",
          },
        }}
      >
        <img
          src={url ?? ""}
          alt=""
          style={{
            boxShadow: `
              0px 11px 15px -7px rgba(0,0,0,0.2),
              0px 24px 38px 3px rgba(0,0,0,0.14), 
              0px 9px 46px 8px rgba(0,0,0,0.12)
            `,
          }}
        />
      </Box>
    </Dialog>
  );
};
