import React, { useCallback, useState } from "react";
import { useDropzone, FileRejection } from "react-dropzone";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string | string[];
  maxSize?: number;
  disabled?: boolean;
  id?: string;
  label?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = ".csv",
  maxSize = 5 * 1024 * 1024, // 5MB
  disabled = false,
  id = "file-upload",
  label = "Arquivo CSV",
}) => {
  const [uploadError, setUploadError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      setUploadError(null);

      if (fileRejections.length > 0) {
        const { errors } = fileRejections[0];
        if (errors.some((e) => e.code === "file-too-large")) {
          setUploadError(
            `Arquivo muito grande. Tamanho máximo é ${maxSize / (1024 * 1024)}MB`,
          );
        } else if (errors.some((e) => e.code === "file-invalid-type")) {
          setUploadError(
            "Tipo de arquivo inválido. Por favor, faça upload de um arquivo CSV.",
          );
        } else {
          setUploadError("Falha no upload do arquivo. Tente novamente.");
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect, maxSize],
  );

  // Accept prop normalization for react-dropzone
  const normalizedAccept =
    typeof accept === "string"
      ? accept.split(",").reduce(
          (acc, type) => {
            const trimmed = type.trim();
            if (trimmed.startsWith(".")) {
              acc["text/csv"] = [trimmed];
              acc["application/vnd.ms-excel"] = [trimmed];
            } else {
              acc[trimmed] = [trimmed];
            }
            return acc;
          },
          {} as Record<string, string[]>,
        )
      : accept.reduce(
          (acc, type) => {
            const trimmed = type.trim();
            if (trimmed.startsWith(".")) {
              acc["text/csv"] = [trimmed];
              acc["application/vnd.ms-excel"] = [trimmed];
            } else {
              acc[trimmed] = [trimmed];
            }
            return acc;
          },
          {} as Record<string, string[]>,
        );

  const { getRootProps, getInputProps, isDragActive, isDragReject, inputRef } =
    useDropzone({
      onDrop,
      accept: normalizedAccept,
      maxSize,
      disabled,
      multiple: false,
    });

  const getBorderColor = () => {
    if (disabled) return "border-gray-200";
    if (isDragReject || uploadError) return "border-red-300";
    if (isDragActive) return "border-primary-400";
    return "border-gray-300";
  };

  const getBackgroundColor = () => {
    if (disabled) return "bg-gray-50";
    if (isDragReject || uploadError) return "bg-red-50";
    if (isDragActive) return "bg-primary-50";
    return "bg-white";
  };

  return (
    <div className="space-y-4">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div
        {...getRootProps()}
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors duration-200 ease-in-out
          ${getBorderColor()} ${getBackgroundColor()}
          ${disabled ? "cursor-not-allowed" : "hover:border-primary-400 hover:bg-primary-50"}
        `}
        aria-disabled={disabled}
        aria-describedby={uploadError ? `${id}-error` : undefined}
        tabIndex={disabled ? -1 : 0}
      >
        <input
          {...getInputProps({
            id,
            "aria-invalid": !!uploadError,
            "aria-describedby": uploadError ? `${id}-error` : undefined,
            disabled,
            ref: inputRef,
          })}
        />

        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-gray-100">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>

          <div>
            {isDragActive ? (
              <p className="text-primary-600 font-medium">
                Solte o arquivo CSV aqui
              </p>
            ) : (
              <div className="space-y-2">
                <p className="text-gray-700 font-medium">
                  {disabled
                    ? "Upload desabilitado"
                    : "Arraste e solte um arquivo CSV aqui, ou clique para selecionar"}
                </p>
                <p className="text-sm text-gray-500">
                  Suporta arquivos CSV até {maxSize / (1024 * 1024)}MB
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {uploadError && (
        <div
          id={`${id}-error`}
          className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3"
          role="alert"
        >
          {uploadError}
        </div>
      )}
    </div>
  );
};
