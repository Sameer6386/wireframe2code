"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CloudUpload, Loader2Icon, WandSparkles, X } from "lucide-react";
import Image from "next/image";
//@ts-ignore
import uuid4 from "uuid4";
import React, { ChangeEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";
import axios from "axios";
import { uuid } from "drizzle-orm/pg-core";
import { useAuthContext } from "@/app/provider";
import { useRouter } from "next/navigation";
import Constants from "@/data/Constants";
import { toast } from "sonner";

interface FileState {
  file: File | null;
  previewUrl: string | null;
}

interface UploadResponse {
  error?: string;
  uid?: string;
}

function ImageUpload() {
  const [fileState, setFileState] = useState<FileState>({
    file: null,
    previewUrl: null,
  });
  const [model, setModel] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const router = useRouter();

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Please upload a JPEG, PNG or WebP image");
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("File size must be less than 5MB");
      return false;
    }
    return true;
  };

  const OnImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0] && validateFile(files[0])) {
      const imageUrl = URL.createObjectURL(files[0]);
      setFileState({
        file: files[0],
        previewUrl: imageUrl,
      });
    }
  };

  const OnConverToCodeButtonClick = async () => {
    try {
      if (!fileState.file || !model || !description) {
        toast.error("Please fill in all fields");
        return;
      }

      if (!storage) {
        toast.error("Storage not initialized");
        return;
      }

      setLoading(true);
      const fileName = `${Date.now()}.${fileState.file.name.split(".").pop()}`;
      const imageRef = ref(storage, `Wireframe_To_Code/${fileName}`);

      await uploadBytes(imageRef, fileState.file);
      const imageUrl = await getDownloadURL(imageRef);
      const uid = uuid4();

      const result = await axios.post<UploadResponse>(
        "/api/wireframe-to-code",
        {
          uid,
          description,
          imageUrl,
          model,
          email: user?.email,
        }
      );

      if (result.data?.error) {
        throw new Error(result.data.error);
      }

      router.push(`/view-code/${uid}`);
    } catch (error: any) {
      toast.error(error.message || "Failed to process image");
      console.error("Conversion error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {!fileState.previewUrl ? (
          <div
            className="p-7 border border-dashed rounded-md shadow-md
                            flex flex-col items-center justify-center
                            "
          >
            <CloudUpload className="h-10 w-10 text-primary" />
            <h2 className="font-bold text-lg">Upload Image</h2>

            <p className="text-gray-400 mt-2">
              Click Button Select Wireframe Image{" "}
            </p>
            <div className="p-5 border border-dashed w-full flex mt-4 justify-center">
              <label htmlFor="imageSelect">
                <h2 className="p-2 bg-blue-100 font-bold text-primary  rounded-md px-5">
                  Select Image
                </h2>
              </label>
            </div>
            <input
              type="file"
              id="imageSelect"
              className="hidden"
              multiple={false}
              onChange={OnImageSelect}
            />
          </div>
        ) : (
          <div className="p-5 border border-dashed">
            <Image
              src={fileState.previewUrl}
              alt="preview"
              width={500}
              height={500}
              className="w-full h-[250px] object-contain"
            />
            <X
              className="flex ite justify-end w-full cursor-pointer"
              onClick={() => setFileState({ ...fileState, previewUrl: null })}
            />
          </div>
        )}
        <div className="p-7 border shadow-md rounded-lg">
          <h2 className="font-bold text-lg">Select AI Model</h2>
          <Select onValueChange={(value) => setModel(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select AI Model" />
            </SelectTrigger>
            <SelectContent>
              {Constants?.AiModelList.map((model, index) => (
                <SelectItem value={model.name} key={index}>
                  <div className="flex items-center gap-2">
                    <Image
                      src={model.icon}
                      alt={model.name}
                      width={25}
                      height={25}
                    />
                    <h2> {model.name}</h2>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <h2 className="font-bold text-lg mt-7">
            Enter Description about your webpage
          </h2>
          <Textarea
            onChange={(event) => setDescription(event?.target.value)}
            className="mt-3 h-[150px]"
            placeholder="Write about your web page"
          />
        </div>
      </div>

      <div className="mt-10 flex items-center justify-center">
        <Button onClick={OnConverToCodeButtonClick} disabled={loading}>
          {loading ? (
            <Loader2Icon className=" animate-spin" />
          ) : (
            <WandSparkles />
          )}
          Convert to Code
        </Button>
      </div>
    </div>
  );
}

export default ImageUpload;
