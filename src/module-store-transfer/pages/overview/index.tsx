import { useState } from "react";
import {
  SCProfileOverView,
  SCSubTitleBox,
  SCSubTitlePad,
  SCSubTitleSpan,
  SCOverviewInfo,
  SCOverviewItem,
  SCOverviewItemTitle,
  SCOverViewSignItem,
  SCButtonSignIn,
  SCBoxChangePassword,
  SCChangePasswordLabel,
  SCChangePasswordInput,
  SCChangePasswordBox,
  SCChangePasswordFlex,
  SCChangePasswordSubmit,
  SCChangePasswordCancel,
  vAccent,
  whiteVar,
  secondaryColorVar,
  grayVar,
  biegeVar,
} from "./styles.css";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import * as globalStyles from "../../../styles/global";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../../../services/profile";
import { useUserData } from "../../../../src/context";
import { notifyError, notifySuccess } from "../../../helpers/notify";
import { Errors } from "../../../components";
import { useTranslation } from "react-i18next";

const Overview = ({ themeUi }: any) => {
  const { t } = useTranslation();
  const { user } = useUserData();
  const [show, setShow] = useState(true);

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = form;
  const { mutate: mutateChangePassword } = useChangePassword();

  const onSave = () => {
    const formData = getValues();
    mutateChangePassword(formData, {
      onSuccess: (data: any) => {
        if (data?.status === 200) {
          notifySuccess(
            t("profile.tabContent.overview.notify.changePswSuccess")
          );
          reset();
          setShow(true);
        } else {
          notifyError(data?.response?.msg || data?.response?.detail);
        }
      },
      onError: (errors: any) => {
        console.log("errors", errors);
        notifyError(errors.response.msg);
      },
    });
  };

  return (
    <>
      <div
        style={assignInlineVars({
          [whiteVar]: globalStyles.white,
          [secondaryColorVar]: globalStyles.secondaryColor,
          [grayVar]: globalStyles.secondaryColor,
          [biegeVar]: globalStyles.gray,
          [vAccent]: globalStyles.chooseThemeColor[themeUi]?.color5, // for REGALBLAZE override
        })}
      >
        <div className={SCProfileOverView}>
          <div className={SCSubTitleBox}>
            <div className={SCSubTitlePad}>
              <span className={SCSubTitleSpan}>
                {t("profile.tabContent.overview.title")}
              </span>
            </div>
          </div>

          <div className={SCOverviewInfo}>
            <div className={SCOverviewItem}>
              <div className={SCOverviewItemTitle}>
                {t("profile.tabContent.overview.fullName")}
              </div>
              <span className={SCSubTitleSpan}>{user?.user?.name}</span>
            </div>

            <div className={SCOverviewItem}>
              <div className={SCOverviewItemTitle}>
                {t("profile.tabContent.overview.role")}
              </div>
              <span className={SCSubTitleSpan}>
                {user?.roles?.permission.toString().replace(/,/g, " | ")}
              </span>
            </div>
          </div>
        </div>

        <div className={SCProfileOverView}>
          <div className={SCSubTitleBox}>
            <div className={SCSubTitlePad}>
              <span className={SCSubTitleSpan}>
                {t("profile.tabContent.overview.signInDetails")}
              </span>
            </div>
          </div>

          <div className={SCOverviewInfo}>
            <div className={SCOverViewSignItem}>
              <div>
                <span className={SCSubTitleSpan}>
                  {t("profile.tabContent.overview.email")}
                </span>
                <div className={SCOverviewItemTitle}>{user.user.email}</div>
              </div>
              <button
                className={SCButtonSignIn}
                style={assignInlineVars({
                  [secondaryColorVar]: globalStyles.secondaryColor,
                  [grayVar]: globalStyles.gray,
                })}
              >
                {t("profile.tabContent.overview.button.notEditable")}
              </button>
            </div>

            {show ? (
              <div className={SCOverViewSignItem}>
                <div>
                  <span className={SCSubTitleSpan}>
                    {t("profile.tabContent.overview.password")}
                  </span>
                  <div className={SCOverviewItemTitle}>
                    {t("profile.tabContent.overview.passwordPlaceholder")}
                  </div>
                </div>
                <button
                  className={SCButtonSignIn}
                  style={assignInlineVars({
                    [secondaryColorVar]: globalStyles.secondaryColor,
                    [grayVar]: globalStyles.gray,
                  })}
                  onClick={() => setShow(false)}
                >
                  {t("profile.tabContent.overview.button.resetPsw")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSave)}>
                <div className={SCBoxChangePassword}>
                  <div className={SCChangePasswordBox}>
                    <label className={SCChangePasswordLabel}>
                      {t("profile.tabContent.overview.currentPsw")}
                    </label>
                    <input
                      className={SCChangePasswordInput}
                      type="password"
                      {...register("old_password", { required: true })}
                    />
                  </div>

                  <div className={SCChangePasswordBox}>
                    <label className={SCChangePasswordLabel}>
                      {t("profile.tabContent.overview.newPsw")}
                    </label>
                    <input
                      className={SCChangePasswordInput}
                      type="password"
                      {...register("new_password", {
                        required: true,
                        minLength: {
                          value: 8,
                          message: t("loginPage.validate.password"),
                        },
                        maxLength: {
                          value: 15,
                          message: t("loginPage.validate.passwordMaxLength"),
                        },
                        pattern: {
                          value:
                            /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/,
                          message: t(
                            "profile.tabContent.manageUsers.validate.formatPassword"
                          ),
                        },
                        validate: (value) =>
                          value.includes(" ")
                            ? t("loginPage.validate.includeSpace") ||
                              "Password must not contain spaces."
                            : true,
                      })}
                    />
                  </div>

                  <div className={SCChangePasswordBox}>
                    <label className={SCChangePasswordLabel}>
                      {t("profile.tabContent.overview.confirmPsw")}
                    </label>
                    <input
                      className={SCChangePasswordInput}
                      type="password"
                      {...register("confirm_password", {
                        required: true,
                        validate: (value) =>
                          value !== getValues("new_password")
                            ? t(
                                "changePasswordPage.validate.confirmPassword"
                              ) || "Passwords must match"
                            : true,
                      })}
                    />
                  </div>
                </div>

                {/* errors row */}
                <div className={SCBoxChangePassword} style={{ paddingTop: 0 }}>
                  <div className={SCChangePasswordBox}>
                    <Errors errors={errors} name="old_password" />
                  </div>
                  <div className={SCChangePasswordBox}>
                    <Errors errors={errors} name="new_password" />
                  </div>
                  <div className={SCChangePasswordBox}>
                    <Errors errors={errors} name="confirm_password" />
                  </div>
                </div>

                <div className={SCChangePasswordFlex}>
                  <button
                    type="submit"
                    disabled={Object.keys(errors).length > 0}
                    className={clsx(
                      SCChangePasswordSubmit,
                      themeUi === "REGALBLAZE" && SCChangePasswordSubmit
                    )}
                    style={
                      themeUi === "REGALBLAZE"
                        ? assignInlineVars({
                            [vAccent]:
                              globalStyles.chooseThemeColor[themeUi]?.color5, // for REGALBLAZE override
                          })
                        : undefined
                    }
                  >
                    {t("profile.tabContent.overview.button.updatePsw")}
                  </button>

                  <button
                    type="button"
                    className={SCChangePasswordCancel}
                    onClick={() => setShow(true)}
                  >
                    {t("profile.tabContent.overview.button.cancel")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
