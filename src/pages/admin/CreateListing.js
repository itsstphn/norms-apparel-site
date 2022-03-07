import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../../firebase/config";
import { useDataContext } from "./../../hooks/useDataContext";
import "./CreateListing.css";

const CreateListing = () => {
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState(0);
  const [newProductThumbnail, setNewProductThumbnail] = useState(null);
  const [newProductCategory, setNewProductCategory] = useState("");

  const { categories } = useDataContext();

  const selectCategories = categories.filter((cat) => cat !== "all");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "products"), {
        productName: newProductName,
        productPrice: +newProductPrice,
        productCategory: newProductCategory,
      });

      // upload thumbnail
      const uploadPath = `thumbnails/${docRef.id}/${newProductThumbnail.name}`;
      const storageRef = ref(storage, uploadPath);
      await uploadBytes(storageRef, newProductThumbnail);

      const imgURL = await getDownloadURL(ref(storage, uploadPath));

      const updateDocRef = doc(db, "products", docRef.id);

      await setDoc(
        updateDocRef,
        { thumbnailURL: imgURL, id: docRef.id },
        { merge: true }
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="create-listing">
      <form onSubmit={handleSubmit}>
        <label>
          <span>Product Name: </span>
          <input
            value={newProductName}
            onChange={(e) => setNewProductName(e.target.value)}
            type="text"
          />
        </label>
        <label>
          <span>Price:</span>
          <input
            value={newProductPrice}
            onChange={(e) => setNewProductPrice(e.target.value)}
            type="number"
          />
        </label>
        <label>
          <span>Upload Image:</span>
          <input
            onChange={(e) => {
              setNewProductThumbnail(e.target.files[0]);
            }}
            type="file"
            accept="image/*"
          />
        </label>
        <label>
          <span>Category</span>

          <select
            value={newProductCategory}
            onChange={(e) => setNewProductCategory(e.target.value)}
          >
            {selectCategories.map((cat) => {
              return (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              );
            })}
          </select>
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default CreateListing;
