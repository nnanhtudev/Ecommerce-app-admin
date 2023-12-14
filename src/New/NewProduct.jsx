import _ from "lodash";
import { createRef, useState } from "react";
import { toast } from "react-toastify";
import ProductAPI from "../API/ProductAPI";

const NewProduct = () => {
  const fileInput = createRef();
  const defaultInput = {
    productInput: { product: "", isValid: true },
    categoryInput: { category: "", isValid: true },
    shortDescInput: { shortDesc: "", isValid: true },
    longDescInput: { longDesc: "", isValid: true },
  };
  const [dataInput, setDataInput] = useState(defaultInput);
  const [file, setFile] = useState([]);
  const formatKeyToLabel = (key) => {
    // Example: fullNameInput -> Full Name
    return key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/\b\w/g, (word) => word.toUpperCase());
  };

  const handleOnchangeInput = (child, key, value) => {
    let _dataInput = _.cloneDeep(dataInput);
    _dataInput[child][key] = value;
    if (key !== "") {
      _dataInput[child].isValid = true;
    }
    setDataInput(_dataInput);
  };

  const handleCheckValidInput = () => {
    let check = true;
    let _dataInputValid = _.cloneDeep(dataInput);

    let isKey = Object.keys(_dataInputValid).find((key) => {
      return Object.values(_dataInputValid[key]).some((value) => value === "");
    });
    if (isKey) {
      let formatKey = formatKeyToLabel(isKey);
      toast.error(`Input ${formatKey} must not be empty...`);
      setDataInput({
        ..._dataInputValid,
        [isKey]: { ..._dataInputValid[isKey], isValid: false },
      });
      return;
    }
    return check;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // handleCheckValidInput();
    let formData = new FormData();
    formData.append("file", file);
    let data = {
      image: formData,
    };
    try {
      let res = await ProductAPI.postCreateProduct(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="page-wrapper">
      <div className="page-breadcrumb">
        <div className="row">
          <form style={{ width: "50%", marginLeft: "40px" }}>
            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                className={dataInput.productInput.isValid ? `form-control` : "form-control is-invalid"}
                placeholder="Enter Product Name"
                value={dataInput.productInput.product}
                onChange={(event) => handleOnchangeInput("productInput", "product", event.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                className={dataInput.categoryInput.isValid ? `form-control` : "form-control is-invalid"}
                placeholder="Enter Category"
                value={dataInput.categoryInput.category}
                onChange={(event) => handleOnchangeInput("categoryInput", "category", event.target.value)}
              />
            </div>
            <div class="form-group">
              <label>Short Description</label>
              <textarea
                className={dataInput.shortDescInput.isValid ? `form-control` : "form-control is-invalid"}
                rows="3"
                placeholder="Enter Short Description"
                value={dataInput.shortDescInput.shortDesc}
                onChange={(event) => handleOnchangeInput("shortDescInput", "shortDesc", event.target.value)}
              ></textarea>
            </div>
            <div class="form-group">
              <label>Long Description</label>
              <textarea
                className={dataInput.longDescInput.isValid ? `form-control` : "form-control is-invalid"}
                rows="6"
                placeholder="Enter Long Description"
                value={dataInput.longDescInput.longDesc}
                onChange={(event) => handleOnchangeInput("longDescInput", "longDesc", event.target.value)}
              ></textarea>
            </div>
            <div class="form-group">
              <label for="exampleFormControlFile1">Upload image (5 images)</label>
              <input
                type="file"
                class="form-control-file"
                id="exampleFormControlFile1"
                multiple
                onChange={(event) => setFile(event.target.files[0])}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={(e) => handleSubmit(e)}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
