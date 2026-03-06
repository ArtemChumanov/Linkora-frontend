"use client";

import { createContext, useContext, useState, ReactNode } from "react";
interface ModalContextType {
  isOpen: boolean;
  modalNode: React.ReactNode | null;
  nodeId: string | null;
  onPresent: (
    node: React.ReactNode,
    id: string,
    closeOnOverlay: boolean,
  ) => void;
  onDismiss: () => void;
}

export const ModalContext = createContext<ModalContextType>(
  {} as ModalContextType,
);

export const ModalProvider = ({ children }: any) => {
  const [modalNode, setModalNode] = useState<React.ReactNode | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [nodeId, setNodeId] = useState<string | null>(null);

  const onPresent = (node: React.ReactNode, id: string) => {
    setModalNode(node);
    setNodeId(id);
    setIsOpen(true);
  };

  const onDismiss = () => {
    setIsOpen(false);
    setModalNode(null);
    setNodeId(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalNode,
        nodeId,
        onPresent,
        onDismiss,
      }}
    >
      {children}
      {modalNode}
    </ModalContext.Provider>
  );
};
