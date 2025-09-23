import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "../ui/dialog";

const ModalZoomInImage = ({
  zoomInImage,
  closeModal,
}: {
  zoomInImage: string;
  closeModal: () => void;
}) => {
  return (
    <Dialog
      open={zoomInImage !== ""}
      onOpenChange={(open) => !open && closeModal()}
    >
      <DialogOverlay className="fixed inset-0 bg-black/50 z-40" />
      <DialogContent
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        max-w-[90vw] max-h-[90vh] min-w-[240px] w-auto h-auto rounded-lg shadow-lg p-0 z-50"
      >
        <div className="flex items-center justify-center w-full h-full p-1">
          <img
            loading="lazy"
            src={zoomInImage}
            alt={zoomInImage}
            className="max-w-full max-h-[80vh] object-contain rounded-lg"
          />
        </div>

      </DialogContent>
    </Dialog>
  );
};

export default ModalZoomInImage;
