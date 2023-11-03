import { useEffect, useState } from "react";

const UploadFieldCustom = ({
  uploadRef,
  classNameUploadZone,
  filesObjectList = [],
  handleChangeInput,
  ...props
}) => {
  return (
    <div {...props}>
      <label htmlFor="file" className={classNameUploadZone} ref={uploadRef}>
        <p>Ajouter vos fichiers</p>
        <input
          type="file"
          name="file"
          id="file"
          className="d-none"
          onChange={handleChangeInput}
          multiple
        />
      </label>
      <div className="my-3 list-zone">
        {
          <ul className="list-group">
            {filesObjectList.map((v) => (
              <li key={v?.uniqueIdentifier} className="list-group-item">
                {v?.name}
              </li>
            ))}
          </ul>
        }
      </div>
    </div>
  );
};

export default UploadFieldCustom;
