//# DEPENDENCYS
import { v4 as uuidv4 } from "uuid";
import path from "path";

//# METHOD
export const newReadStream = async (folder, file) => {
  const { createReadStream, filename } = await file;
  const { ext, name } = path.parse(filename);
  const _hash = `${name}_${uuidv4()}`;
  const imageName = `${folder}/${_hash}${ext}`;
  const fileData = createReadStream();
  return {
    fileData,
    imageName,
    _hash,
    ext,
  };
};
