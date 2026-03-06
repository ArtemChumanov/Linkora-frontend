import {
  cloneElement,
  isValidElement,
  ReactElement,
  useCallback,
  useContext,
} from "react";
import { ModalContext } from "@/providers/ModalProvider";

export const useModal = (
  modal: ReactElement,
  modalId = "default",
): [() => void, () => void] => {
  const { onPresent, onDismiss } = useContext(ModalContext);

  const open = useCallback(() => {
    if (!isValidElement(modal)) {
      console.error("useModal: modal must be valid React element");
      return;
    }

    const node = cloneElement(modal, {
      isOpen: true,
      onClose: onDismiss,
    });

    onPresent(node, modalId, true);
  }, [modal, modalId, onDismiss, onPresent]);

  return [open, onDismiss];
};
