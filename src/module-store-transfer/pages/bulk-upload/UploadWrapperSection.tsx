import { useEffect, useRef, useState } from "react";
import { UploadSectionWrapper } from "./style";
import UploadRightSection from "./UploadRightSection";
import UploadLeftSection from "./UploadLeftSection";
import NoDataToDisplay from "./NoDataToDisplay";
import { notifyError } from "../../../helpers/notify";
import { useUserData } from "../../../context";
import { usePostUsersDataForValidations } from "../../../services/profile";
import readXlsxFile from "read-excel-file";
import _ from "lodash";

function UploadWrapperSection({
  setIsAssignPageOpen,
  setValidUserData,
  validUserData,
}: any) {
  const [noData, setNoData] = useState(true);
  const [errorCount, setErrorCount] = useState(0);
  const [errorData, setErrorData] = useState<any>([]);
  const user = useUserData();
  const [progress, setProgress] = useState(0);

  const {
    mutateAsync: postUsersDataForValidation,
    isLoading,
    isSuccess,
  } = usePostUsersDataForValidations();

  const [file, setFile] = useState<any>();

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null); // Track when loading started

  useEffect(() => {
    if (isLoading) {
      // Clear previous interval
      if (intervalRef.current) clearInterval(intervalRef.current);

      // Start from 0
      setProgress(0);
      let current = 0;
      startTimeRef.current = Date.now();

      intervalRef.current = setInterval(() => {
        current += 1;
        if (current <= 90) {
          setProgress(current);
        } else {
          clearInterval(intervalRef.current!);
        }
      }, 500); // Speed of progress increase
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isSuccess) {
      const now = Date.now();
      const minDuration = 4000; // ms (your debounce time)
      const elapsed = startTimeRef.current ? now - startTimeRef.current : 0;
      const delay = Math.max(minDuration - elapsed, 0);

      // Ensure progress continues at least for `minDuration` before jumping to 100%
      const timeout = setTimeout(() => {
        setProgress(100);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [isSuccess]);

  const handleUploadClick = async () => {
    console.log("also here");
    setProgress(0);

    if (!file) {
      notifyError("Please select a file to upload");
      return;
    }

    const fileData = await file.arrayBuffer();
    const data = await readXlsxFile(fileData, {
      parseNumber: (string) => string,
    });

    if (data.length === 0) {
      notifyError("No data found in the file.");
      return;
    }

    if (data.length === 1) {
      if (!_.isEqual(data[0], ["Username", "Email ID", "Password"])) {
        notifyError("Invalid file format. Please upload a valid template.");
        return;
      }
    }
    if (data.length === 1) {
      if (_.isEqual(data[0], ["Username", "Email ID", "Password"])) {
        notifyError(
          "Please enter atleast one row of data apart from the header."
        );
        return;
      }
    }

    if (data.length - 1 > 500) {
      notifyError("You can only upload a maximum of 500 records at a time.");
      return;
    }

    const userData = data.map((row: any, index: number) => {
      return {
        id: index,
        username: row[0] ?? "",
        email: row[1] ?? "",
        pwd: row[2] ?? "",
      };
    });


    userData.shift();
    console.log("also also here");
    // @TODO: commented for testing needs to be uncommented for api call
    try {
      const response = await postUsersDataForValidation({ userData });
      console.log("response", response);
      console.log("also also her.....e");

      setNoData(false);
      if (response?.data?.ec && response?.data?.ec > 0) {
        if (response?.data.inv_ent) {
          const errorRowData = response?.data?.inv_ent?.map((row: any) => {
            return {
              error: row?.err,
              username: userData[row.id - 1].username,
              email: userData[row.id - 1].email,
              pwd: userData[row.id - 1].pwd,
              roles: null,
              permissions: null,
            };
          });

          setErrorData(errorRowData);
        }
        const validData = userData.filter((row: any) => {
          return !response?.data?.inv_ent?.some(
            (errorRow: any) => errorRow.id === row.id
          );
        });
        validData.forEach((ele: any, index: number) => {
          ele.id = index + 1;
        });
        setValidUserData(validData);
        setNoData(false);
      } else {
        setValidUserData(userData);
        setNoData(false);
      }
    } catch (error: any) {
      notifyError("Failed to validate data!");
    }
  };

  const handleFileChange = (e: any) => {
    if (e?.target?.files?.length < 1) {
      return;
    }

    const file = e?.target?.files?.[0];
    switch (file?.type) {
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        setFile(file);
        break;
      default:
        notifyError("Only xlsx files are accepted");
    }
  };

  return (
    <UploadSectionWrapper>
      <UploadLeftSection
        setErrorCount={setErrorCount}
        setErrorData={setErrorData}
        setValidData={setValidUserData}
        setNoData={setNoData}
        handleUploadClick={handleUploadClick}
        handleFileChange={handleFileChange}
        file={file}
      />
      {noData ? (
        <NoDataToDisplay imgSrc={"/assets/img/no data to display.svg"} />
      ) : (
        <UploadRightSection
          errorCount={errorCount}
          errorData={errorData}
          validData={validUserData}
          setIsAssignPageOpen={setIsAssignPageOpen}
          progress={progress}
        />
      )}
    </UploadSectionWrapper>
  );
}

export default UploadWrapperSection;
