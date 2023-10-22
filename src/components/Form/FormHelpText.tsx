import { Typography } from "@mui/material";
import { FormHelpTextProps } from "src/types/Form";

export const FormHelpText = ({ fieldState }: FormHelpTextProps) => {
  return (
    <>
      {fieldState.error ? (
        <Typography
          marginTop={"5px"}
          color={"error"}
          sx={{ textAlign: "left" }}
          variant="tB14"
        >
          {`${fieldState.error.message ?? fieldState.error?.root?.message}`}
        </Typography>
      ) : null}
    </>
  );
};
