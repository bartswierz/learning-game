import { useNavigate } from "react-router-dom";
import useSettingsStore from "@/store/store";
import { Route } from "@/types/types";
import { useTranslation } from "react-i18next";

interface RedirectUserModalProps {
  redirectRoute: Route;
  closeModalCallback: () => void;
}

const RedirectUserModal = ({ redirectRoute, closeModalCallback }: RedirectUserModalProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const resetProgress = useSettingsStore((state) => state.resetProgress);

  // Close the modal
  const handleCancel = () => closeModalCallback();

  // Reset user progress, closes modal, & redirects user to new route
  const handleReset = () => {
    console.log("INSIDE MODAL - HANDLE RESET");
    resetProgress();
    closeModalCallback();

    // Redirect user to new route i.e. '/addition'
    navigate(redirectRoute);
  };

  return (
    <>
      {/* BACKGROUND - FULL SCREEN */}
      <div className="absolute z-[20] inset-0 bg-black/80 w-screen h-screen">
        {/* MODAL CONTENT */}
        <div className="flex items-center justify-center h-full">
          <div className="w-[300px] p-4 text-center bg-gray-200 rounded-md">
            <div className="mb-4 mt-2 text-gray-800 ">
              <p>{t("This will reset progress")}</p>
              <p>{t("Are you sure?")}</p>
            </div>

            {/* BUTTONS CONTAINER */}
            <div className="flex justify-center items-center gap-4">
              <button
                className="bg-gray-500 hover:bg-gray-600 hover:text-white duration-200 ease-in px-4 py-2 rounded-md"
                onClick={handleCancel}
              >
                {t("No")}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 hover:text-white duration-200 ease-in px-4 py-2 rounded-md"
                onClick={handleReset}
              >
                {t("Yes")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RedirectUserModal;
