import {
  cloneElement,
  isValidElement,
  ReactElement,
  useCallback,
  useContext,
} from "react";
import { ModalContext } from "@/providers/ModalProvider";

type ModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
};
export const useModal = <T extends ModalProps>(
  modal: ReactElement<T>,
  modalId = "default",
): [() => void, () => void] => {
  const { onPresent, onDismiss } = useContext(ModalContext);

  const open = useCallback(() => {
    if (!isValidElement(modal)) {
      console.error("useModal: modal must be valid React element");
      return;
    }

    // Тут ми кастимо пропси до правильного типу
    const node = cloneElement(modal, {
      ...(modal.props as T),
      isOpen: true,
      onClose: onDismiss,
    });

    onPresent(node, modalId, true);
  }, [modal, modalId, onDismiss, onPresent]);

  return [open, onDismiss];
};
