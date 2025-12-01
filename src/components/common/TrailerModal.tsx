import { useQuery } from "@tanstack/react-query";
import { Modal, CircularProgress, Box } from "@mui/material";
import { IoClose } from "react-icons/io5";

import type { TrailerModalProp, VidType } from "@app-types/type";
import { trailerVideo } from "@api/moviesApi";

// IMPORT STYLED COMPONENTS
import {
  ModalBox,
  ModalHeader,
  ModalTitle,
  CloseButton,
  VideoWrapper,
  Iframe,
} from "@styles/videoModal.styles";

const TrailerModal = ({ id, type, onClose }: TrailerModalProp) => {
  const { data: videoTrailer, isLoading } = useQuery({
    queryKey: ["videoTrailer", id, type],
    queryFn: async () => {
      const res = await trailerVideo(type, id, "en-US");
      const results = res.data.results;
      return results.find((vid: VidType) => vid.type === "Trailer" && vid.site === "YouTube");
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 15,
  });

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
