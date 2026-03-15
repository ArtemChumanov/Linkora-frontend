import {
  cloneElement,
  isValidElement,
  ReactElement,
  useCallback,
  useContext,
} from "react";
import { ModalContext } from "@/providers/ModalProvider";

export type ModalProps<Param = unknown> = {
  isOpen?: boolean;
  onClose?: () => void;
  param?: Param;
};
export const useModal = <T extends ModalProps>(
  modal: ReactElement<T>,
  modalId = "default",
) => {
  const { onPresent, onDismiss } = useContext(ModalContext);

  const open = useCallback(
    (param?: T["param"]) => {
      if (!isValidElement(modal)) {
        console.error("useModal: modal must be valid React element");
        return;
      }

      const node = cloneElement(modal, {
        ...(modal.props as T),
        param,
        isOpen: true,
        onClose: onDismiss,
      });

      onPresent(node, modalId, true);
    },
    [modal, modalId, onDismiss, onPresent],
  );

  return [open, onDismiss];
};
