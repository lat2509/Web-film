import { Modal, CircularProgress, Box } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { useTrailer } from "@hooks/useTrailer";

import {
  ModalBox,
  ModalHeader,
  ModalTitle,
  CloseButton,
  VideoWrapper,
  Iframe,
} from "./TrailerModal.styles";

export interface TrailerModalProp {
  id: number;
  type: "movie" | "tv";
  onClose: () => void;
}

const TrailerModal = ({ id, type, onClose }: TrailerModalProp) => {
  const { data: videoTrailer, isLoading } = useTrailer({ id, type });

  const origin = window.location.origin;

  return (
    <Modal
      open={true}
      onClose={onClose}
      slotProps={{
        backdrop: {
          sx: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
        },
      }}
    >
      <ModalBox>
        {/* Header */}
        <ModalHeader>
          <ModalTitle>{videoTrailer?.name || "Trailer"}</ModalTitle>

          <CloseButton onClick={onClose}>
            <IoClose size={24} />
          </CloseButton>
        </ModalHeader>

        {/* Video Body */}
        <VideoWrapper>
          {isLoading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress sx={{ color: "white" }} />
            </Box>
          ) : videoTrailer ? (
            <Iframe
              title="Trailer"
              src={`https://www.youtube.com/embed/${videoTrailer.key}?origin=${origin}&enablejsapi=1&rel=0&autoplay=1`}
              allow="autoplay; encrypted-media"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
              color="grey.500"
              fontSize="1.2rem"
            >
              No Trailer Available
            </Box>
          )}
        </VideoWrapper>
      </ModalBox>
    </Modal>
  );
};

export default TrailerModal;
