import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase";

const uplaod = async (file) => {
    const storageRef = ref(storage, `upload/images/${Date.now() + file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject)=> {

        uploadTask.on('state_changed', 
            (snapshot) => {
             const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, 
        (error) => {
            reject("Something went wrong!" + error.message)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL)
            });
        }
        );
})
}

export default uplaod;