import './loading.style.css';
import { Box, styled } from "@mui/material";
import { useLoadingContext } from "src/provider/loading.provider";

export const LoadingModule = () => {
 const { isLoading } = useLoadingContext();

  return (
    <LoadingContainer sx={{
      display: isLoading ? undefined : 'none'
    }}>
      <BoxLoading>
        <span className="loader"></span>
      </BoxLoading>
    </LoadingContainer>
  )
};

const LoadingContainer = styled(Box)({
  position: 'fixed',
  zIndex: '9999999999999999999999999',
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0, .5)',
})

const BoxLoading = styled(Box)({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
})