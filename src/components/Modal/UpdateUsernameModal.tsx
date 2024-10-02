import { patcher } from "@/helper/apiHelper";
import useCheckUsername from "@/hooks/useCheckUsername";
import useDebounce from "@/hooks/useDebounce";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { Poppins } from "next/font/google";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const poppins = Poppins({
  subsets: ["latin"],
  weight: "300",
});

interface ModalProps {
  username: string | null;
  isOpen: boolean;
  onOpenChange: () => void;
}

const UpdateUsernameModal = ({
  isOpen,
  onOpenChange,
  username,
}: ModalProps) => {
  const [usernameValue, setUsernameValue] = useState(username);
  const [load, setLoad] = useState(false);

  const queryClient = useQueryClient();

  const debouncedUsername = useDebounce(usernameValue, 250);
  const { isTaken, loading } = useCheckUsername(debouncedUsername);
  const handleUpdateUsername = async () => {
    try {
      setLoad(true);
      await patcher(`users/me`, {
        first_name: usernameValue,
      });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
      setLoad(false);
      onOpenChange();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={poppins.className}
        placement="center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update username
              </ModalHeader>
              <ModalBody>
                <p className="text-sm">Enter new username</p>

                <Input
                  value={usernameValue || ""}
                  onChange={(e) => setUsernameValue(e.target.value)}
                  placeholder="Enter your username"
                  color="primary"
                  size="lg"
                  radius="sm"
                />
                <div className="flex justify-start">
                  {loading && <Spinner />}
                </div>
                {isTaken &&
                  username !== usernameValue &&
                  !loading &&
                  usernameValue !== "" && (
                    <p className="text-red-500">Username is already taken.</p>
                  )}
                {!isTaken &&
                  username !== usernameValue &&
                  !loading &&
                  usernameValue !== "" && (
                    <p className="text-green-500">Username is available!</p>
                  )}
              </ModalBody>
              <ModalFooter>
                {isTaken || usernameValue === "" ? (
                  <Button
                    isDisabled
                    className="cursor-not-allowed"
                    color="primary"
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    onPress={handleUpdateUsername}
                    isLoading={load}
                  >
                    Update
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateUsernameModal;
